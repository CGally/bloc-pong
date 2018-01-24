var court = document.getElementById("court");
var courtContext = court.getContext("2d");

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  move(distance) {
    this.distance = distance;
    this.y += this.distance;
    if(this.y > court.height - this.height) {
      this.y = court.height - this.height;
    } else if(this.y < 0) {
      this.y = 0;
    }
  };
  render() {
    courtContext.fillRect(this.x, this.y, this.width, this.height);
  };
};

class Player {
  constructor(paddle) {
    this.paddle = paddle;
  }
  render() {
    this.paddle.render()
  };
};

class Computer {
  constructor(paddle) {
    this.paddle = paddle;
  }
  render() {
    this.paddle.render()
  };
};

class Ball {
  constructor() {
    this.x = court.width / 2;
    this.y = court.height / 2;
    this.radius = 7;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
  }
  render() {
    courtContext.beginPath();
    courtContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
    courtContext.lineWidth = 10;
    courtContext.strokeStyle = 'red';
    courtContext.stroke();
    courtContext.closePath();
  };
};

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

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

function step() {
  courtContext.clearRect(0, 0, 1100, 700);
  render();
  animate(step);
}

window.addEventListener('keydown', function(event) {
    if (event.keyCode === 40) {
        player.paddle.move(30);
    } else if (event.keyCode === 38) {
        player.paddle.move(-30);
    }
});

window.onload = function() {
  step();
};
