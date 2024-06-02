"use strict";
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}
function displayScore(score) {
  document.querySelector(".score").textContent = score;
}
function displayNumber(secretNumber) {
  document.querySelector(".number").textContent = secretNumber;
}
function setBackground(color) {
  document.querySelector("body").style.backgroundColor = color;
}
function guessing(guess)
{
  document.querySelector(".guess").value = guess;
}
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  //no input
  if (!guess) {
    displayMessage("no number");
  }
  //win
  else if (guess === secretNumber) {
    if (score > 1) {
      displayMessage("correct");

      displayScore(score);
      displayNumber(secretNumber);
      setBackground("#60b347");
      if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
      }
    }
    //different
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "too high" : "too low");
      score--;
      displayScore(score);
    } else {
      displayMessage("you lost the game");
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  setBackground("#222");
  displayMessage("start guessing");
  guessing(" "); 
  displayNumber("?");
  displayScore(score);
});
