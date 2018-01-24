class Computer {
  constructor(paddle) {
    this.paddle = paddle;
    this.score = 0;
  }
  update(ball) {
    if(ball.y > this.paddle.y) {
      this.paddle.move(5);
    } else {
      this.paddle.move(-5);
    }
  };
  render() {
    document.getElementById("comp").textContent = 'Computer score: ' + this.score;
    this.paddle.render()
  };
};
