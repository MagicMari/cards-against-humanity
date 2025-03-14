const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const os = require('os')
const all_cards = require('./all_cards.js');
const cards = new all_cards()
let players = {}

let packsForRooms = {}
const rooms = {};

const official_packs = cards.getAllOfficialPacks()
const community_packs = cards.getAllCommunityPacks()

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html')
})
app.get('/host', (req, res) => {
  res.sendFile(__dirname + '/public/host.html')
})
app.get('/player', (req, res) => {
  res.sendFile(__dirname + '/public/player.html')
})
app.get('/join', (req, res) => {
  res.sendFile(__dirname + '/public/join.html')
})
app.get('/end', (req, res) => {
  res.sendFile(__dirname + '/public/game_end.html')
})

// var userCount = {}
var roomInfo = {}
// stored Ids
// var usersConnected = {}

io.sockets.on('connection', (socket) => {

  // joining room
  socket.on('join:room', (data) => {
    //console.log('Joining room, ', data.roomID)
    socket.join(data.roomID)

    // console.log(data.role);
    if (data.role == 'player') {
      // console.log('Player, so add to count')

      try {
        if (roomInfo[data.roomID].gameStarted == false) {
          try {
            roomInfo[data.roomID].userCount++
            roomInfo[data.roomID].usersConnected.push(socket.conn.id)
            io.sockets.in(data.roomID).emit('no_connected', {no: roomInfo[data.roomID].userCount})
          } catch {
            // the roomInfo for data.roomID is undefined, meaning a host has never visited it
            //console.log(roomInfo[data.roomID])
            io.sockets.in(data.roomID).emit('error', {message: "Room does not exist."})
          }
        } else {
          //console.log('GAME ALREADY STARTED')
          io.to(socket.conn.id).emit('error', {message: "This game has already started."})
        }
      } catch {
        //console.log('Room does not exist')
        io.sockets.in(data.roomID).emit('error', {message: "Room does not exist."})
      }
    } else {
      // it's the host
      // userCount[data.roomID] = 0
      // usersConnected[data.roomID] = []
      roomInfo[data.roomID] = {
        userCount: 0,
        usersConnected: [],
        hostID: socket.conn.id,
        gameStarted: false
      }
    }

    // console.log(roomInfo)
  })

  socket.on('player_disconnect', (data) => {
    if(roomInfo[data.roomID] != undefined) {
      console.log("Updated user count:", roomInfo[data.roomID]['userCount'])
      roomInfo[data.roomID]['userCount']--
      delete roomInfo[data.roomID]['usersConnected'][data.playerID]
      console.log(roomInfo[data.roomID]['userCount'])
      io.to(roomInfo[data.roomID]['hostID']).emit('updatePlayerCount', {newPlayerCOunt: roomInfo[data.roomID]['userCount']})
    }
  })


  socket.on('start_game', (data) => {
    //console.log('Start game')
    roomInfo[data.roomID].gameStarted = true
    io.sockets.in(data.roomID).emit('start_game', {})
    io.sockets.in(data.roomID).emit('all_players', {players: players[data.roomID]})
  })

  socket.on('get_black_cards', (data) => {
    var combined_packs = []
    if(data.officialPacks.length != 0) {
      combined_packs.push(...data.officialPacks)
    } else if(data.communityPacks.length != 0) {
      combined_packs.push(...data.communityPacks)
    } else {
      combined_packs = ['CAH Base Set']
    }
    //console.log(data.officialPacks)
    //console.log(data.communityPacks)
    //console.log(combined_packs)
    io.sockets.in(data.roomID).emit('recieve_black_cards', {blackCards: cards.getBlackCardsFor(combined_packs)})
    packsForRooms[data.roomID] = combined_packs
  })

  socket.on('get_white_cards', (data) => {
    io.sockets.in(data.roomID).emit('recieve_white_cards', {whiteCards: cards.getWhiteCardsFor(packsForRooms[data.roomID])})
  })

  socket.on('game_has_ended', (data) => {
    //console.log('Game ended for room:', data.roomID);
    io.sockets.in(data.roomID).emit('game_ended', {});
    //console.log("All rooms :", roomInfo);
  })
  
  socket.on('need_end_game_data', (data) => {
    //console.log('Game ended for room:', data.roomID)
    //console.log('Game Stats are:', players[data.roomID])
    io.sockets.in(data.roomID).emit('game_stats', {players: players[data.roomID]})
  })

  socket.on('delete_game_stats', (data) => {
    delete players[data.roomID]
    delete packsForRooms[data.roomID]
  })

  socket.on('blackCard', (data) => {
    io.sockets.in(data.roomID).emit('blackCard', {blackCard: data.blackCard})
  })

  // on white card chosen
  socket.on('card_chosen', (data) => {
    //console.log(data.card, data.roomID)
    io.sockets.in(data.roomID).emit('card_chosen', {card: data.card, player: data.player})
  })

  socket.on('add_point_to', (data) => {
    //console.log(data.player, data.points)
    addPlayerScore(data.roomID, data.player, data.points)
    //io.sockets.in(data.roomID).emit('card_chosen', {card: data.card, player: data.player})
  })

  socket.on('playerJoin', (data) => {
    //console.log("Player Name:", data.playerName)
    //console.log("User ID:", socket.conn.id)
    //console.log("RoomID:", data.roomID)

    // Check if the room exists in `players`
    if (!(data.roomID in players)) {
        players[data.roomID] = [] // Create a new room if it doesn't exist
    }

    // Add the player to the room
    players[data.roomID].push({ 
        name: data.playerName, 
        id: socket.conn.id, 
        score: 0 
    })
    //io.sockets.in(data.roomID).emit('all_players', {players: players[data.roomID]})
    //console.log("Updated Players:", players)
  })

  socket.on('request_official_packs', (data) => {
    //console.log('Sending Official Packs to:', data.hostID)
    io.to(data.hostID).emit('official_packs', {packs: official_packs})
  })

  socket.on('request_community_packs', (data) => {
    //console.log('Sending Community Packs to:', data.hostID)
    io.to(data.hostID).emit('community_packs', {packs: community_packs})
  })

  socket.on('check_name', (data => {
    var isAllowed = isUsernameAvailable(data.name, data.roomID)
    if(isAllowed == true) {
      io.to(data.clientID).emit('allow_name', {})
    } else {
      io.to(data.clientID).emit('disallow_name', {})
    }
  }))

  function isUsernameAvailable(username, roomID) {
    console.log('Checking', username)
    // Username validation: only letters and numbers, no spaces or special characters
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      console.log("Special Characters:", username)
      return false
    }
  
    // Check if the room exists
    if (!(roomID in rooms)) {
      console.log("Room exist:", username)
      Object.assign(rooms, {[roomID]:[username]})
      return true
    }
    
    var compareNames = true
    rooms[roomID].forEach(player => {
      console.log('Comparing', player.toLowerCase(),'with:', username.toLowerCase())
      if((player.toLowerCase()) === (username.toLowerCase())) {
        console.log('Returning False')
        compareNames = false
      }
    })
    return compareNames
  }

  function addPlayerScore(roomID, playerName, newScore) {
    // Ensure the room exists
    if (!players[roomID]) {
        console.error("Room not found:", roomID);
        return;
    }

    // Find the player by name
    let player = players[roomID].find(p => p.name === playerName);
    
    if (player) {
        player.score = player.score + newScore; // Update score
        //console.log(`Updated ${playerName}'s score to ${newScore}`);
    } else {
        console.error("Player not found:", playerName);
    }
}
  socket.on('disconnect', (data) => {

    let id = socket.conn.id
    //console.log(id)
    // implement logic to change number of connecteds

    // check if the socket was a host
    //console.log(roomInfo)
    Object.keys(roomInfo).forEach((room) => {
      if (id == roomInfo[room].hostID) {
        //console.log('Deleting room ', room)
        delete roomInfo[room]
        delete rooms[room]

        io.sockets.in(room).emit('error', {message: "The host disconnected"})
      }
    })

    // console.log(roomInfo)
  })
})


http.listen(3000, () => {
  const address = http.address();
  
  // Log the address of the server (127.0.0.1 or ::)
  const host = address.address === '::' ? 'localhost' : address.address
  //console.log(`Server listening on ${host}:${address.port}`)
  
  // Log all available network interfaces
  const networkInterfaces = os.networkInterfaces()
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((iface) => {
      if (iface.family === 'IPv4') {
        console.log(`IPv4 address on ${interfaceName}: ${iface.address}`)
      }
    })
  })
})