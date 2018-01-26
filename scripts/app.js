const court = document.getElementById("court");
const courtContext = court.getContext("2d");
const comp = document.getElementById("comp");
const playa = document.getElementById("playa");
const playa2 = document.getElementById("playa-2");
const gameOver = document.getElementById("game-over");
const winner = document.getElementById("winner");
const timer = document.getElementById("time")
const modal = document.getElementById("modal")
const start = document.getElementById("start")
const volume = document.getElementById("volume")
const vol = document.getElementById("vol")
const mute = document.getElementById("mute")

var laserSound = new buzz.sound("/sounds/laser.wav", { volume: 70 });
var beepSound = new buzz.sound("/sounds/beep.wav", { volume: 70 });
var loserSound = new buzz.sound("/sounds/NGGYU.mp3", { volume: 30 });
var winnerSound = new buzz.sound("/sounds/FFI.mp3", { volume: 30 });
var gameSound = new buzz.sound("/sounds/game.mp3", { volume: 30 });
var currentVolume = 70

var opponent;
var dif;
var serveCount;
var count;
var stop;

var animate = window.requestAnimationFrame ||
function(callback) { window.setTimeout(callback, 1000/60) };

var player = new Player(
  new Paddle(1080, 300, 10, 100)
);
var player2 = new Player(
  new Paddle(10, 300, 10, 100)
);
var computer = new Computer(
  new Paddle(10, 300, 10, 100)
);
var ball = new Ball();

function setVolume(percent) {
  if(percent > 0) {
    currentVolume = percent;
  }
  laserSound.setVolume(percent);
  beepSound.setVolume(percent);
  loserSound.setVolume(percent / 2);
  winnerSound.setVolume(percent / 2);
  gameSound.setVolume(percent / 2);
};

function setDifficulty() {
  if(document.level.difficulty[1].checked === true) {
    dif =1;
  } else if (document.level.difficulty[2].checked === true){
    dif = 2;
  } else {
    dif = 0;
  }
};

function paintBoard() {
  var player = new Player(
    new Paddle(1080, 300, 10, 100)
  );
  if(document.player.players[1].checked === true) {
    var player2 = new Player(
      new Paddle(10, 300, 10, 100)
    );
  } else {
    var computer = new Computer(
      new Paddle(10, 300, 10, 100)
    );
  }
  var ball = new Ball();
};

function setOpponent() {
  if(document.player.players[1].checked === true) {
    opponent = player2;
  } else {
    opponent = computer
  }
  if(opponent === player2) {
    player2.score  = 0
  } else {
    computer.score = 0
  }
};

function countDown() {
  if(player.score === 0 && computer.score === 0) {
    beepSound.load();
    beepSound.play();
  }
  count -= 1
  timer.style.display = 'block';
  timer.textContent = count;
  if(count <= 0) {
    stop = false;
    timer.style.display = 'none';
    clearInterval(serveCount)
  }
};

function serve() {
  courtContext.clearRect(0, 0, 1100, 700);
  player.paddle.y = (court.height / 2) - (player.paddle.height / 2);
  if(document.player.players[1].checked === true) {
    player2.paddle.y = (court.height / 2) - (player.paddle.height / 2);
  } else {
    computer.paddle.y = (court.height / 2) - (computer.paddle.height / 2);
  }
  render();
  stop = true;
  count = 4;
  setTimeout(function() {step()}, 4000);
  serveCount = setInterval(function() {countDown()}, 1000);
};

function render() {
  player.render();
  if(document.player.players[1].checked === true) {
    player2.render();
  } else {
    computer.render();
  }
  ball.render();
};

function step() {
  if(opponent.score == 11) {
    comp.textContent = 'Player 2 score: ' + opponent.score;
    gameSound.stop();
    if(opponent === player2) {
      winnerSound.load();
      winnerSound.play();
      winner.style.display = 'block';
      modal.style.display = 'block';
      start.style.display = 'block';
    } else {
    loserSound.load();
    loserSound.play();
    gameOver.style.display = 'block';
    modal.style.display = 'block';
    start.style.display = 'block';
    }
  } else if(player.score == 11) {
    gameSound.load();
    winnerSound.load();
    winnerSound.play();
    playa.textContent = 'Player score: ' + player.score;
    winner.style.display = 'block';
    modal.style.display = 'block';
    start.style.display = 'block';
  } else if(player.scored === true || computer.scored === true) {
    serve();
    player.scored = false;
    computer.scored = false;
  } else {
    courtContext.clearRect(0, 0, 1100, 700);
    render();
    ball.move();
    computer.update(ball);
    animate(step);
  }
};

function gameStart() {
  loserSound.stop();
  winnerSound.stop();
  gameSound.load();
  gameSound.play();
  gameSound.loop()
  paintBoard();
  setOpponent();
  setDifficulty();
  player.score  = 0
  gameOver.style.display = 'none';
  winner.style.display = 'none';
  start.style.display = 'none';
  modal.style.display = 'none';
  serve();
};

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 40) {
    if(stop === false) {
      player.paddle.move(50);
    }
  } else if (event.keyCode === 38) {
    if(stop === false) {
      player.paddle.move(-50);
    }
  }
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 83) {
    if(stop === false) {
      player2.paddle.move(50);
    }
  } else if (event.keyCode === 87) {
    if(stop === false) {
      player2.paddle.move(-50);
    }
  }
});

volume.addEventListener('input', function(event) {
  setVolume(event.target.value);
  if(event.target.value < 1) {
    mute.style.display = 'inline-block';
    vol.style.display = 'none';
  } else {
    mute.style.display = 'none';
    vol.style.display = 'inline-block';
  }
});

vol.addEventListener('click', function(event) {
  setVolume(0);
  mute.style.display = 'inline-block';
  vol.style.display = 'none';
});

mute.addEventListener('click', function(event) {
  setVolume(currentVolume);
  mute.style.display = 'none';
  vol.style.display = 'inline-block';
});

window.onload = function() {
  render();
};
