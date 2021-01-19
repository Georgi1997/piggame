'use strict';
//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//Rolling Dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating random Dice Roll
    const randomDice = Math.trunc(Math.random() * 6 + 1);

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;

    //3.Check for rolled 1
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // if true switch to next player

      switchPlayer();
    }
  }
});

//Holding score
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to the active player' score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if player' score >= 100
    if (scores[activePlayer] >= 20) {
      //Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//Resetting the game
btnNew.addEventListener('click', function () {
  currentScore = 0;

  playing = true;
  scores[0] = 0;
  scores[1] = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});
