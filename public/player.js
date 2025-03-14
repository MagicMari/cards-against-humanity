let $pregame = document.querySelector('#pregame');
let $handCards = document.querySelector('#white_cards');
let $blackCard = document.querySelector('#black_card');
let $scoreboard = document.querySelector('#scoreboard');
let selectedCard = null;
let currentCard = null;

// Shuffle and draw initial hand
let WHITE_CARDS = [];
let whiteDeck = shuffle([...WHITE_CARDS]);
//let handCards = whiteCards.splice(0, 5);
let handCards = [];

var socket = io();
let roomID = location.hash.split('#')[1];
let playerName = location.hash.split('#')[2];

let players = {}; // Object to store player names & scores
let $scoreList = document.querySelector('#score_list');
var playerList = [];
let maxSelections = 2; // Set how many cards can be chosen
let selectedCards = []; // Stores selected cards


// Join room
socket.emit('join:room', { roomID: roomID, role: 'player' });

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  event.returnValue = "";
  console.log("User is closing, leaving, or reloading the page...");
  socket.emit('player_disconnect', {roomID: roomID, playerID: socket.id})
});

// Start game event
socket.on('start_game', () => {
  $pregame.style.display = 'none';
  $scoreboard.classList.remove('hidden'); // Show scoreboard
  //players = {};
  socket.emit('get_white_cards', {roomID: roomID});
  showElement($blackCard);
});

socket.on('game_ended', () => {
  window.location.href = '/end#' + roomID + '#' + playerName;
})

socket.on('all_players', (data) => {
  clearPlayerList();
  playerList = [];
  players = {};
  data.players.forEach(player => {
    addPlayer(player.name, player.score);
    playerList.push(player);
  })
  highlightPlayer(playerName);
})

socket.on('blackCard', (data) => {
  $blackCard.innerHTML = data.blackCard;
});

socket.on('recieve_white_cards', (data) => {
  WHITE_CARDS = data.whiteCards;
  console.log(WHITE_CARDS)
  round();
})

function round() {
  selectedCard = null;
  $handCards.innerHTML = '';

  //var whiteCards = shuffle([...WHITE_CARDS]);
  for(let i = handCards.length;  i < 10; i++){
    handCards.push(drawCard());
  }
  //handCards = whiteCards.splice(0, 6);

  handCards.forEach(card => {
    let cardElement = document.createElement('div');
    // cardElement.classList.add('card', 'bg-white', 'text-black', 'p-4', 'rounded-lg', 'cursor-pointer', 'hover:bg-gray-200');
    cardElement.classList.add('card', 'selected-text', 'bg-white', 'text-black', 'p-4', 'rounded-lg', 'hover:bg-gray-200', 'border-4', 'flex', 'flex-col', 'justify-center', 'items-center', 'text-center');
    cardElement.innerHTML = `<span class="card-text">${card}</span>`;
    cardElement.onclick = () => chooseCard(cardElement, escape(card));
    $handCards.appendChild(cardElement);
  });
}

function drawCard() {
    if (whiteDeck.length === 0) {
        whiteDeck = shuffle([...WHITE_CARDS]); // Reshuffle when empty
    }
    return whiteDeck.pop(); 
}

function chooseCard(el, card) {
  if (selectedCard) return;
  selectedCard = el;
  currentCard = card;

  socket.emit('card_chosen', { roomID: roomID, card: card, player: playerName});

  removeItemOnce(handCards, selectedCard.innerText);

  el.classList.add('border-4', 'border-red-500', 'opacity-50');
  el.classList.remove('cursor-pointer');
  el.innerHTML = `<span class="text-green-500 block text-sm font-bold mb-2">Card Selected</span><br>${el.innerHTML}`;

  let cards = document.querySelectorAll('.card');
  cards.forEach(cardEl => {
    if (cardEl !== el) {
      cardEl.classList.add('opacity-50');
      cardEl.onclick = null;
    }
  });
}

function decodeHtmlEntities(str) {
  let textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

function removeItemOnce(arr, value) {
  let decodedCards = arr.map(decodeHtmlEntities);
  var index = decodedCards.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

socket.on('error', (data) => {
  alert(data.message);
  window.location.href = '/';
});

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