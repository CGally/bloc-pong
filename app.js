var court = document.getElementById("court");
var courtContext = court.getContext("2d");

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    courtContext.fillStyle = 'black';
    this.render = function() {
      courtContext.fillRect(this.x, this.y, this.width, this.height);
    };
  }
};

class Player {
  constructor(paddle) {
    this.paddle = paddle;
    this.render = function() {
      this.paddle.render()
    }
  }
};

class Computer {
  constructor(paddle) {
    this.paddle = paddle;
    this.render = function() {
      this.paddle.render()
    };
  }
};

class Ball {
  constructor() {
    this.x = court.width / 2;
    this.y = court.height / 2;
    this.radius = 7;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.render = function () {
      courtContext.beginPath();
      courtContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
      courtContext.lineWidth = 10;
      courtContext.strokeStyle = 'red';
      courtContext.stroke();
      courtContext.closePath();
    };
  }
};

var player = new Player(
  new Paddle(1080, 300, 10, 100)
);

var computer = new Computer(
  new Paddle(10, 300, 10, 100)
);

var ball = new Ball();

function render() {
  player.render();
  computer.render();
  ball.render();
}

window.onload = function() {
  render();
};
