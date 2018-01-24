var court = document.getElementById("court");
var courtContext = court.getContext("2d");

var player = new Player(
  new Paddle(1080, 300, 10, 100)
);
var computer = new Computer(
  new Paddle(10, 300, 10, 100)
);
var ball = new Ball();

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

function render() {
  player.render();
  computer.render();
  ball.render();
}

function step() {
  if(computer.score == 11) {
    document.getElementById("comp").textContent = 'Computer score: ' + computer.score;
    document.getElementById("game-over").style.display = 'block';
  } else if(player.score == 11) {
    document.getElementById("playa").textContent = 'Player score: ' + player.score;
    document.getElementById("winner").style.display = 'block';
  } else {
    courtContext.clearRect(0, 0, 1100, 700);
    render();
    ball.move();
    computer.update(ball);
    animate(step);
  }
}

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 40) {
    player.paddle.move(50);
  } else if (event.keyCode === 38) {
    player.paddle.move(-50);
  }
});

window.onload = function() {
  step();
};
