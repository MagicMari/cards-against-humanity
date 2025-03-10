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

// joining room
socket.emit('join:room', {roomID: roomID, role: 'host'});

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

$nextRoundButton.onclick = function() {
  console.log('new round');
  //console.log(selectedCard);
  socket.emit('add_point_to', {roomID: roomID, player: selectedCard.querySelector("#player").innerText, points: 1})
  round();
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