class Player {
  constructor(paddle) {
    this.paddle = paddle;
    this.score = 0;
  }

  render() {
    document.getElementById("playa").textContent = 'Player score: ' + this.score;
    this.paddle.render()
  };
};
