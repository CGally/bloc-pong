class Player {
  constructor(paddle) {
    this.paddle = paddle;
    this.score = 0;
    this.scored = false;
  }

  render() {
    playa.textContent = 'Player score: ' + this.score;
    this.paddle.render()
  };
};
