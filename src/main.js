const scene = document.querySelector('.scene');
const player = document.querySelector('.player');
const bot = document.querySelector('.bot');
const rockBtn = document.querySelector('.rock');
const paperBtn = document.querySelector('.paper');
const scissorsBtn = document.querySelector('.scissors');
const restartBtn = document.querySelector('.restart');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const botScore = document.querySelector('.bot-score');
const humanScore = document.querySelector('.human-score');
const subtext = document.querySelector('.subtext');
const overlay = document.querySelector('.overlay');

let _botScore = 0;
let _humanScore = 0;

rockBtn.addEventListener('click', () => {
  play('rock');
});

paperBtn.addEventListener('click', () => {
  play('paper');
});

scissorsBtn.addEventListener('click', () => {
  play('scissors');
});

restartBtn.addEventListener('click', () => {
  restart();
});

function play(option) {
  const botDecision = botPlay();
  const humanDecision = option;
  const humanDecisionImg = `<img class="left sprite" src="public/${humanDecision}.png">`;
  const botDecisionImg = `<img class="right sprite" src="public/${botDecision}.png">`;

  player.innerHTML = '';
  player.innerHTML = humanDecisionImg;
  bot.innerHTML = '';
  bot.innerHTML = botDecisionImg;

  subtext.textContent = `${humanDecision} vs ${botDecision}`;

  const winDie = {
    'rock': 'scissors',
    'scissors': 'paper',
    'paper': 'rock'
  }

  if(winDie[humanDecision] === botDecision) {
    hideOverlay('block');
    _humanScore++;
    setTimeout(() => {
      updateScore();
      win('human');
      hideOverlay('none');
    }, 700);
  } else if(humanDecision === botDecision) {
    hideOverlay('block');
    setTimeout(() => {
      subtext.textContent = 'TIE';
      hideOverlay('none');
    }, 700);
  } else {
    hideOverlay('block');
    _botScore++;
    setTimeout(() => {
      updateScore();
      win('bot');
      hideOverlay('none');
    }, 700);
  }

  winner();
}

function hideOverlay(op) {
  overlay.style.display = op;
}

function updateScore() {
  botScore.textContent = _botScore;
  humanScore.textContent = _humanScore;
}

function botPlay() {
  const decisions = ['rock', 'paper', 'scissors'];

  return decisions[Math.floor(Math.random() * 3)];
}

function win(op) {
  subtext.textContent = `${op} +1`;
}

function winner() {
  if(_humanScore === 3) {
    setTimeout(() => {
      subtext.textContent = 'Human winner';
      hideOverlay('block');
      setTimeout(() => {
        hideButtons();
        hideOverlay('none');
      }, 700);
    }, 700);
  } else if(_botScore === 3) {
    setTimeout(() => {
      subtext.textContent = 'Bot winner';
      hideOverlay('block');
      setTimeout(() => {
        hideButtons();
        hideOverlay('none');
      }, 700);
    }, 700);
  }
}

function hideButtons() {
  rockBtn.style.display = 'none';
  paperBtn.style.display = 'none';
  scissorsBtn.style.display = 'none';
  restartBtn.style.display = 'block';
}

function restart() {
  rockBtn.style.display = 'block';
  paperBtn.style.display = 'block';
  scissorsBtn.style.display = 'block';
  restartBtn.style.display = 'none';

  _botScore = 0;
  _humanScore = 0;
  updateScore();

  subtext.textContent = 'Again?';

  player.innerHTML = '';
  bot.innerHTML = '';
  player.innerHTML = `<img class="left sprite" src="public/rock.png"></img>`;
  bot.innerHTML = `<img class="right sprite" src="public/rock.png"></img>`;
}