let $pregame = document.querySelector('#pregame');
let $linkTextarea = document.querySelector('#link');
let $playerCount = document.querySelector('#players');
let $gameStarting = document.querySelector('#game_starting');
let $startGameButton = document.querySelector('#start_button');

let $blackCard = document.querySelector('#black_card');
let $whiteCards = document.querySelector('#white_cards');

let $roundEnd = document.querySelector('#round_end');
let $nextRoundButton = document.querySelector('#next_round');

// shuffle them
let blackCards = shuffle(BLACK_CARDS);

// other info
var noPlayers;
var whiteCardsReceived = [];

var socket = io();
let roomID = Math.random().toString(36).substring(2);

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

$startGameButton.onclick = () => {
  round();
}

// called every round
function round() {
  socket.emit('start_game', {roomID: roomID}); // alerts players to start round()
  // reset data from previous rounds
  whiteCardsReceived = [];

  hideElement($pregame);
  hideElement($roundEnd);
  // clear white cards from previous round
  showElement($blackCard);
  clearElement($whiteCards);

  let newBlackCard = blackCards.splice(0, 1);
  $blackCard.innerHTML = newBlackCard;
  //socket.emit('new_blackCard', {roomID: roomID, new_black_card: newBlackCard})
  socket.emit('blackcard', {roomID: roomID});
  console.log(newBlackCard);
}

socket.on('card_chosen', (data) => {
  whiteCardsReceived.push(data.card);
  if (whiteCardsReceived.length == noPlayers) {
    for (i=0; i<whiteCardsReceived.length; i++) {
      // whiteCardsRec[i] is already escaped
      $whiteCards.innerHTML += `
        <div
          class="card"
          onclick='selectWhiteCard(this, "${whiteCardsReceived[i]}")'
        > ${unescape(whiteCardsReceived[i])}
        </div>
      `;
    }
  }
})

function selectWhiteCard(el, card) {
  console.log('Selected ', card);
  el.style.border = '1px solid red';

  // show white card in black card blank
  let p = $blackCard.innerHTML;
  let n = `${p.split("__")[0]}<i><u>${unescape(card)}</u></i>${p.split("__")[1]}`;
  $blackCard.innerHTML = n;

  showElement($roundEnd);
}

$nextRoundButton.onclick = function() {
  console.log('new round');
  round();
}