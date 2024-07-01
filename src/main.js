const scene = document.querySelector('.scene');
const player = document.querySelector('.player');
const bot = document.querySelector('.bot');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const botScore = document.querySelector('.bot-score');
const humanScore = document.querySelector('.human-score');
const subtext = document.querySelector('.subtext');
const overlay = document.querySelector('.overlay');

const buttons = document.querySelector('.buttons').querySelectorAll('button');
const [rockBtn, paperBtn, scissorsBtn, restartBtn] = buttons;

let [_botScore, _humanScore] = [0, 0];

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.id === 'restart' ? restart() : play(button.id);
  });
});

function newElem(tag, className = null, src = null) {
  const elem = document.createElement(tag);

  if(className) elem.setAttribute('class', className);
  if(src) elem.src = src;

  return elem;
}

function cleanScene() {
  while(player.firstChild && bot.firstChild) {
    player.removeChild(player.firstChild);
    bot.removeChild(bot.firstChild);
  }
}

function play(option) {
  const botDecision = botPlay();
  const humanDecision = option;

  const humanDecisionImg = newElem('img', 'left sprite', `public/${humanDecision}.png`);
  const botDecisionImg = newElem('img', 'right sprite', `public/${botDecision}.png`);

  cleanScene();

  player.appendChild(humanDecisionImg);
  bot.appendChild(botDecisionImg);

  subtext.textContent = `${humanDecision} vs ${botDecision}`;

  const winDie = {
    'rock': 'scissors',
    'scissors': 'paper',
    'paper': 'rock'
  }

  hideOverlay('block');

  if(winDie[humanDecision] === botDecision) {
    _humanScore++;
    win('😀');
  } else if(humanDecision === botDecision) {
    win(false);
  } else {
    _botScore++;
    win('🤖');
  }

  setTimeout(() => {    
    hideOverlay('none')
    updateScore();
  }, 700);
  
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
  return decisions[Math.floor(Math.random() * decisions.length)];
}

function win(op) {
  if(op) {
    setTimeout(() => { subtext.textContent = `${op} +1`;  }, 700);
  } else {
    setTimeout(() => { subtext.textContent = 'TIE' }, 700);
  }
}

function winner() {
  setTimeout(() => {
    if(_humanScore === 5) {
      subtext.textContent = 'human winner 😆';
      hideOverlay('none')
      hideButtons('none', 'block');
    } else if(_botScore === 5) {
      subtext.textContent = 'bot winner 🤖';
      hideOverlay('none');
      hideButtons('none', 'block');
    }
  }, 700);
}

function hideButtons(op, op2) {
  buttons.forEach((button) => {
    button.style.display = op;
    if(button.id === 'restart') button.style.display = op2;
  });
}

function restart() {
  const default0 = newElem('img', 'left sprite', 'public/rock.png');
  const default1 = newElem('img', 'right sprite', 'public/rock.png');

  hideButtons('block', 'none');

  [_humanScore, _botScore] = [0, 0];

  updateScore();

  subtext.textContent = 'Again? 😼';

  cleanScene()

  player.appendChild(default0);
  bot.append(default1);
}