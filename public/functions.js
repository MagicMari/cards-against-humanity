function hideElement(elem) {
  elem.style.display = 'none'
}

function showElement(elem, display='block') {
  elem.style.display = display
}

function clearElement(elem) {
  elem.innerHTML = ''
}

function shuffle(array) {
  let shuffledArray = [...array]; // Copy the array to prevent modifying the original
  let currentIndex = shuffledArray.length, randomIndex;

  // Fisher-Yates Shuffle
  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap elements
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = 
      [shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }

  return shuffledArray;
}