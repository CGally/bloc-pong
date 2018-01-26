class Player {
  constructor(paddle) {
    this.paddle = paddle;
    this.score = 0;
    this.scored = false;
  }

  render() {
    this.paddle.render()
  };
};
