let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

updateScore();

// if (!score){ // !score is same as if score === null
//   score.wins = 0,
//   score.ties = 0
//   score.losses = 0
// };
let isAutoplaying = false;
let intervalID;
function autoPlay() {
  if (!isAutoplaying) {
    intervalID = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove)
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalID);
    isAutoplaying = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "Scissors") {
    if (computerMove === "Scissors") {
      result = "Tie";
    } else if (computerMove === "Rock") {
      result = "You Lose";
    } else if (computerMove === "Paper") {
      result = "You win";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You Lose";
    } else if (computerMove === "Scissors") {
      result = "You win";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Rock") {
      result = "You Lose";
    } else if (computerMove === "Scissors") {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScore();

  document.querySelector(".js-moves").innerHTML = `You
<img src="images/${playerMove}-emoji.png" alt="" class="move-icon" />
<img src="images/${computerMove}-emoji.png" alt="" class="move-icon" />
Computer`;

  document.querySelector(".js-result").innerHTML = `${result}.`;
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins},Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNum = Math.random();

  if (randomNum < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNum < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }
  return computerMove;
}