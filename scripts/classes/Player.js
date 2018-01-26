class Player {
  constructor(paddle) {
    this.paddle = paddle;
    this.score = 0;
    this.scored = false;
  }

  render() {
    playa.textContent = 'Player score: ' + this.score;
    if(opponent === player2) {
      comp.textContent = 'Player 2 score: ' + this.score;
    }
    this.paddle.render()
  };
};
