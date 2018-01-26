const court = document.getElementById("court");
const courtContext = court.getContext("2d");
const comp = document.getElementById("comp");
const playa = document.getElementById("playa");
const gameOver = document.getElementById("game-over");
const winner = document.getElementById("winner");
const timer = document.getElementById("time")
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

var player = new Player(
  new Paddle(1080, 300, 10, 100)
);
var computer = new Computer(
  new Paddle(10, 300, 10, 100)
);
var ball = new Ball();

var serveCount;
var count;
var stop;

var animate = window.requestAnimationFrame ||
function(callback) { window.setTimeout(callback, 1000/60) };

function setVolume(percent) {
  if(percent > 0) {
    currentVolume = percent;
  }
  laserSound.setVolume(percent);
  beepSound.setVolume(percent);
  loserSound.setVolume(percent / 2);
  winnerSound.setVolume(percent / 2);
  gameSound.setVolume(percent / 2);
}

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
  computer.paddle.y = (court.height / 2) - (computer.paddle.height / 2);
  render();
  stop = true;
  count = 4;
  setTimeout(function() {step()}, 4000);
  serveCount = setInterval(function() {countDown()}, 1000);
};

function render() {
  player.render();
  computer.render();
  ball.render();
};

function step() {
  if(computer.score == 11) {
    comp.textContent = 'Computer score: ' + computer.score;
    gameSound.stop();
    loserSound.load();
    loserSound.play();
    gameOver.style.display = 'block';
    start.style.display = 'block';
  } else if(player.score == 11) {
    gameSound.load();
    winnerSound.load();
    winnerSound.play();
    playa.textContent = 'Player score: ' + player.score;
    winner.style.display = 'block';
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
  player = new Player(
    new Paddle(1080, 300, 10, 100)
  );
  computer = new Computer(
    new Paddle(10, 300, 10, 100)
  );
  var ball = new Ball();
  computer.score = 0
  player.score  = 0
  gameOver.style.display = 'none';
  winner.style.display = 'none';
  start.style.display = 'none';
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
