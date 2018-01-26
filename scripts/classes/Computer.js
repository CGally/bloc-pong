class Computer {
  constructor(paddle) {
    this.paddle = paddle;
    this.score = 0;
    this.scored = false;
  }
  update(ball) {
    if(ball.y > this.paddle.y + (this.paddle.height / 2)) {
      if(dif === 0) {
        this.paddle.move(4);
      } else if(dif === 1) {
        this.paddle.move(8);
      } else {
        this.paddle.move(12);
      }
    } else {
      if(dif === 0) {
        this.paddle.move(-4);
      } else if(dif === 1) {
        this.paddle.move(-8);
      } else {
        this.paddle.move(-12);
      }
    }
  };
  render() {
    comp.textContent = 'Player 2 score: ' + this.score;
    this.paddle.render()
  };
};
