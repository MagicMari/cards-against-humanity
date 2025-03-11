let $pregame = document.querySelector('#pregame');
let $linkTextarea = document.querySelector('#link');
let $playerCount = document.querySelector('#players');
let $gameStarting = document.querySelector('#game_starting');
let $startGameButton = document.querySelector('#start_button');
let $scoreList = document.querySelector('#score_list');
let $scoreboard = document.querySelector('#scoreboard');

let $blackCard = document.querySelector('#black_card');
let $whiteCards = document.querySelector('#white_cards_host');

let $roundEnd = document.querySelector('#round_end');
let $nextRoundButton = document.querySelector('#next_round');
let $qrcode = document.querySelector('#qrcode');
let $end_game = document.querySelector('#end_game');

let players = {};
var playerList = [];

// shuffle them
let blackCards = shuffle([...BLACK_CARDS]);

// other info
var noPlayers;
var whiteCardsReceived = [];
var whiteCardsPlayer = [];

var socket = io();
let roomID = Math.random().toString(36).substring(2);

let selectedCard = null;

$linkTextarea.innerText = roomID;

window.onload = function() {
    let roomCode = roomID;
    var baseURL = window.location.origin;
    baseURL = baseURL + `/join#${roomCode}`;
    const qrcode = new QRCode(document.getElementById('qrcode'), {
        text: baseURL,
        width: 192,
        height: 192,
        colorDark : '#000',
        colorLight : '#fff',
        correctLevel : QRCode.CorrectLevel.H
    });
}

// joining room
socket.emit('join:room', {roomID: roomID, role: 'host'});

socket.on('game_ended', () => {
  window.location.href = '/end#' + roomID + '#host';
})

socket.on('no_connected', (data) => {
  // incrementing dispaly
  $playerCount.innerText = parseInt($playerCount.innerText) + 1;
  noPlayers = parseInt($playerCount.innerText);
  if (parseInt($playerCount.innerText) == 1) {
    // if there are 1 players, start the game. change to 2 later
    $gameStarting.style.display = 'block';
  }
})

socket.on('all_players', (data) => {
  clearPlayerList();
  playerList = [];
  players = {};
  data.players.forEach(player => {
    addPlayer(player.name, player.score);
    playerList.push(player);
  })
})

$startGameButton.onclick = () => {
  $end_game.onclick = () => {
    console.log("Game has ended");
    socket.emit('game_has_ended', {roomID: roomID});
  }
  $nextRoundButton.onclick = function() {
    console.log('new round');
    //console.log(selectedCard);
    socket.emit('add_point_to', {roomID: roomID, player: selectedCard.querySelector("#player").innerText, points: 1})
    round();
  }  
  round();
}


// called every round
function round() {
  $scoreboard.classList.remove('hidden');
  console.log("RoomID: ");
  console.log(roomID);
  socket.emit('start_game', {roomID: roomID}); // alerts players to start round()
  // reset data from previous rounds
  whiteCardsReceived = [];
  whiteCardsPlayer = [];

  hideElement($pregame);
  hideElement($roundEnd);
  hideElement($qrcode);
  // clear white cards from previous round
  showElement($blackCard);
  clearElement($whiteCards);

  let newBlackCard = drawCard();
  $blackCard.innerHTML = newBlackCard;
  socket.emit('blackCard', {roomID: roomID, blackCard: newBlackCard});
}

function drawCard() {
    if (blackCards.length === 0) {
      blackCards = shuffle([...WHITE_CARDS]); // Reshuffle when empty
    }
    return blackCards.pop(); 
}

socket.on('card_chosen', (data) => {
  whiteCardsReceived.push(data.card);
  whiteCardsPlayer.push(data.player);
  if (whiteCardsReceived.length == noPlayers) {
    for (i=0; i<whiteCardsReceived.length; i++) {
      // whiteCardsRec[i] is already escaped
      $whiteCards.innerHTML += `
        <div id=${whiteCardsPlayer[i]}
          class="card selected-text bg-white text-black p-4 rounded-lg hover:bg-gray-200 border-4 flex flex-col justify-center items-center text-center"
          onclick='selectWhiteCard(this, "${whiteCardsReceived[i]}")'
        > <span class="card-text">${unescape(whiteCardsReceived[i])}</span>

        <p id=player class=opacity-50 block text-sm font-bold mb-2 card-text>${whiteCardsPlayer[i]} </p>
        </div>
      `;
    }
  }
})

function selectWhiteCard(el, card) {
  console.log('Selected ', card);
  console.log("Card ID: ", el.querySelector("#player").innerText);
  // If a card was already selected, remove its selection
  if (selectedCard) {
    selectedCard.classList.remove('border-4', 'border-red-500', 'opacity-50');
  }

  // Set the new selection
  selectedCard = el;
  el.classList.add('border-4', 'border-red-500', 'opacity-50'); // Highlight the selected card

  // Update the black card with the chosen white card text
  let p = $blackCard.innerHTML;
  try{
    let $selected_card_u = document.querySelector('#selected_card');
    $selected_card_u.innerText = unescape(card);
  } catch{
    let n = `${p.split("__")[0]}<i><u id="selected_card">${unescape(card)}</u></i>${p.split("__")[1]}`;
    $blackCard.innerHTML = n;
  }
  showElement($roundEnd);
}


// Add a player to the scoreboard
function addPlayer(playerName, points = 0) {
  if (players[playerName]) return; // Prevent duplicates

  players[playerName] = points;

  let li = document.createElement('li');
  li.id = `player-${playerName}`;
  li.textContent = `${playerName}: ${points} Points`;
  li.classList.add('p-2', 'hover:bg-gray-700', 'cursor-pointer');
  $scoreList.appendChild(li);
}

// Update a player's score
function updateScore(playerName, newScore) {
  if (!players[playerName]) return;

  players[playerName] = newScore;
  let li = document.getElementById(`player-${playerName}`);
  if (li) li.textContent = `${playerName}: ${newScore} Points`;
}

// Remove a player from the scoreboard
function removePlayer(playerName) {
  if (!players[playerName]) return;

  delete players[playerName];
  let li = document.getElementById(`player-${playerName}`);
  if (li) li.remove();
}

function clearPlayerList() {
  players.forEach(player =>{
    delete players[player.name];
    let li = document.getElementById(`player-${player.name}`);
    if (li) li.remove();
  });
}

// Highlight a player (e.g., current judge)
function highlightPlayer(playerName) {
  document.querySelectorAll('#score_list li').forEach(li => {
    li.classList.remove('bg-yellow-500', 'text-black');
  });

  let li = document.getElementById(`player-${playerName}`);
  if (li) li.classList.add('bg-yellow-500', 'text-black');
}
function clearPlayerList() {
  $scoreList.innerHTML = '';
}

function addCardPack(packId, packName) {
  const packElement = document.getElementById(`pack-${packId}`);
  if (!packElement) return;

  // Remove from unselected packs
  packElement.remove();

  // Create a new list item for the selected packs
  const selectedPackList = document.getElementById("selected_packs");
  const newPack = document.createElement("li");
  newPack.classList.add("card-pack-pill", "bg-green-500", "text-white", "p-4", "rounded");
  newPack.id = `selected-pack-${packId}`;
  newPack.onclick = function () {
    removeCardPack(packId, packName);
  };
  newPack.innerHTML = `${packName}`;
  
  selectedPackList.appendChild(newPack);
}

function removeCardPack(packId, packName) {
  const selectedPackElement = document.getElementById(`selected-pack-${packId}`);
  if (!selectedPackElement) return;

  // Remove from selected packs
  selectedPackElement.remove();

  // Add back to unselected packs
  const unselectedPackList = document.getElementById("unselected_packs");
  const newPack = document.createElement("li");
  newPack.classList.add("card-pack-pill");
  newPack.id = `pack-${packId}`;
  newPack.innerText = packName;
  newPack.onclick = function() { addCardPack(packId, packName); };

  unselectedPackList.appendChild(newPack);
}

function searchCardPack(query) {
  const allPacks = document.querySelectorAll("#unselected_packs .card-pack-pill");
  query = query.toLowerCase();

  allPacks.forEach(pack => {
    const text = pack.innerText.toLowerCase();
    if (text.includes(query)) {
      pack.style.display = "block";
    } else {
      pack.style.display = "none";
    }
  });
}

document.getElementById("card_pack_search").addEventListener("input", function() {
  searchCardPack(this.value);
});

let packCounter = 1; // Start from the next available ID

function addUnselectedPack(packName) {
  const unselectedPackList = document.getElementById("unselected_packs");

  // Create a unique ID
  const packId = `pack-${packCounter++}`;

  // Create a new list item for the pack
  const newPack = document.createElement("li");
  newPack.classList.add("card-pack-pill");
  newPack.id = packId;
  newPack.innerText = packName;
  newPack.onclick = function () {
      addCardPack(packId, packName);
  };

  // Append the new pack to the list
  unselectedPackList.appendChild(newPack);
}

fetch('cah-all-full.json')
    .then(response => response.json())
    .then(jsonData => {
        const navigator = new JSONNavigator(jsonData);

        function getAllOfficialPacks() {
            let i = 0;
            let official_packs = [];
            
            while (true) {
                let packName = navigator.get(i + '.name');
                if (packName === undefined) break;

                if (navigator.get(i + '.official')) {
                    official_packs.push(packName);
                }
                i++;
            }
            return official_packs;
        }
        var official_packs = getAllOfficialPacks();
          official_packs.forEach(pack => {
          addUnselectedPack(pack);
        });
        //console.log("Official Packs:", getAllOfficialPacks());
    })
    .catch(error => console.error("Error loading JSON:", error));