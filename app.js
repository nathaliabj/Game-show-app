// ***************************
//    Main variables
// ***************************

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const restartBtn = overlay.querySelector('a');
const h1 = overlay.querySelector('h1');
const phraseLetters = document.getElementsByClassName('letter');
let missed = 0;
const phrases = [
  'broken glass',
  'the long drive',
  'comfort in destiny',
  'when we were young',
  'there was love all around',
  'tell me what you see',
  'these are words that go together well'
];

// ***************************
//    Functions
// ***************************


// function to get a random phrase
function randomPhrase() {
  return Math.floor(Math.random() * phrases.length);
}


// function to split the items inside the array
function getRandomPhraseAsArray(arr) {
  let phraseIndex = randomPhrase();
  let answerPhrase = arr[phraseIndex];
  const answerArray = answerPhrase.split("");
  return answerArray;
}

// function to display the phrases. adding the class of space if it is one, or the class of letter if it is a letter
function addPhrasetoDisplay(arr) {
  const ul = phrase.firstElementChild;
  for (let i = 0; i < arr.length; i += 1) {
    let li = document.createElement('LI');
    li.textContent = arr[i];
    if (arr[i] == ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    ul.appendChild(li);
  }
}

// function to check if the letter in the button selected matches the letter in the phrase
function checkLetter(button) {
  let letterFound = false;
  for (let i = 0; i < phraseLetters.length; i += 1) {
    if (phraseLetters[i].textContent == button.textContent) {
      // add the show class for the letter to display
      phraseLetters[i].classList.add('show');
      // animation added when the letter displays
      phraseLetters[i].classList.add('tada');
      letterFound = null;
    } else {
      button.setAttribute('disabled', true);
    }
  }
  return letterFound;
 }


// function that checks if the game was win or lost
function checkWin() {
    let numCorrect = document.querySelectorAll('.show');
    // if the phrase is all guesed then the overlay will display 'you win'
    if (phraseLetters.length == numCorrect.length ) {
    overlay.classList.replace('start', 'win');
    h1.textContent = 'You Win!!!';
    overlay.appendChild(h1);
    restartBtn.innerHTML = 'Play Again';
    restartBtn.style.background = '#fff';
    overlay.style.visibility = 'visible';
    // if the count on missed equals 5 then the overlay will display 'you lose'
    } else if(missed === 5) {
      overlay.classList.replace('start', 'lose')
      h1.textContent = 'You Lose!';
      overlay.appendChild(h1);
      restartBtn.innerHTML = 'Try Again';
      restartBtn.style.background = '#fff';
      overlay.style.visibility = 'visible';
    }
}

// calling the functions to display the random phrase
let phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

// ***************************
//    Event Listeners
// ***************************

// event listener for the qwerty
qwerty.addEventListener('click', (e) => {
  // if the button is clicked
  if(e.target.tagName == 'BUTTON') {
    let button = e.target;
    // the class of chosen will be added to it
    button.className = 'chosen';
    let letterFound = checkLetter(button);
    // if the button clicked is not the same as the letter in the phrase, it will take one life off
    if (letterFound !== null) {
      tries = document.querySelectorAll('.tries');
      const lives = tries[missed].firstElementChild;
      missed += 1;
      lives.setAttribute('src', 'images/lostHeart.png');
      // gives a different color to the buttons that are wrong
      button.className = 'wrong';
    }
  }
    // delays the overlay for win or lost to show so the animation on the phrase can finish before
    setTimeout(checkWin, 600);
});


// event listener for the overlay
overlay.addEventListener('click', (e) => {
  const chosen = document.querySelectorAll('.chosen');
  const wrong = document.querySelectorAll('.wrong');
  const ul = phrase.firstElementChild;
  let tries = document.querySelectorAll('.tries');
  const button = e.target;
  overlay.className = 'start';
  // if the start game button is clicked then the overlay will hide and show the game
  if(e.target.className == 'btn__reset') {
      overlay.style.visibility = 'hidden';
      // if the user wants to play again can click the button and the game will restart
    } if (e.target.textContent == 'Play Again' || button.textContent == 'Try Again' ) {
      missed = 0;
      // removes the previous phrase and displays a new random one
      while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
      } addPhrasetoDisplay(getRandomPhraseAsArray(phrases));
     // removes the classe from the qwerty buttons that were selected previously
       for( let i = 0; i < chosen.length; i += 1) {
        chosen[i].removeAttribute('disabled');
        chosen[i].classList.remove('chosen');
      }
      // loop to remove the color from the wrong chosen letters
       for (let i = 0; i < wrong.length; i += 1) {
        wrong[i].classList.remove('wrong');
        wrong[i].removeAttribute('disabled');
      }
      // loop to recreate the lives
      for ( let i = 0; i < tries.length; i += 1) {
      const lives = tries[i].firstElementChild;
      lives.setAttribute('src', 'images/liveHeart.png');
    }
  }
});
