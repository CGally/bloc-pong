const court = document.getElementById("court");
const courtContext = court.getContext("2d");
const comp = document.getElementById("comp");
const playa = document.getElementById("playa");
const gameOver = document.getElementById("game-over");
const winner = document.getElementById("winner");
const timer = document.getElementById("time")
const start = document.getElementById("start")

var mySound = new buzz.sound("/sounds/laser.wav");

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

function countDown() {
    count -= 1
    timer.style.display = 'block';
    timer.textContent = count;
    if(count <= 0) {
      stop = 1;
      timer.style.display = 'none';
      clearInterval(serveCount)
    }
};

function serve() {
    courtContext.clearRect(0, 0, 1100, 700);
    player.paddle.y = (court.height / 2) - (player.paddle.height / 2);
    computer.paddle.y = (court.height / 2) - (computer.paddle.height / 2);
    render();
    stop = 0;
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
    gameOver.style.display = 'block';
    start.style.display = 'block';
  } else if(player.score == 11) {
    playa.textContent = 'Player score: ' + player.score;
    winner.style.display = 'block';
    start.style.display = 'block';
  } else if(player.scored === true) {
    serve();
    player.scored = false;
  } else if(computer.scored === true) {
    serve();
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
    if(stop === 1) {
      player.paddle.move(50);
    }
  } else if (event.keyCode === 38) {
    if(stop === 1) {
      player.paddle.move(-50);
    }
  }
});

window.onload = function() {
  render();
};
