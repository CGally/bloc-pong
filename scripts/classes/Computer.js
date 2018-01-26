class Computer {
  constructor(paddle) {
    this.paddle = paddle;
    this.score = 0;
    this.scored = false;
  }
  update(ball) {
    if(ball.y > this.paddle.y + (this.paddle.height / 2)) {
      this.paddle.move(6);
    } else {
      this.paddle.move(-6);
    }
  };
  render() {
    comp.textContent = 'Computer score: ' + this.score;
    this.paddle.render()
  };
};
