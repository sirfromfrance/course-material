"use strict";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const btnRoll = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const btnHold = document.querySelector(".btn--hold");
const btnReset = document.querySelector(".btn--new");
let scores, activePlayer, currentScore, playing;

init();

function init() {
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.add("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player1.classList.remove("player--active");
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    dice.classList.remove("hidden");
    const picture = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${picture}.png`;
    //add to current score
    if (picture !== 1) {
      currentScore += picture;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //switch to the next player
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
  }
  if (scores[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

btnReset.addEventListener("click", init);
