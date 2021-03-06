class Ball {
  constructor() {
    this.x = court.width / 2;
    this.y = court.height / 2;
    this.radius = 5;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.speedX = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 10 + 2);
    this.speedY = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 5);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y < this.radius) {
      this.y = this.radius;
      this.speedY *= -1.00001;
    } else if (this.y > court.height - this.radius) {
      this.y = court.height - this.radius;
      this.speedY *= -1.00001;
    }
    function paddleBallColliding(ball ,paddle){
      var distX = Math.abs(ball.x - paddle.x - paddle.width / 2);
      var distY = Math.abs(ball.y - paddle.y - paddle.height / 2);

      if (distX > (paddle.width / 2 + ball.radius)) {
        return false;
      }
      if (distY > (paddle.height / 2 + ball.radius)) {
        return false;
      }

      if (distX <= (paddle.width / 2)) {
        return true;
      }

      var dx = distX-paddle.width / 2;
      var dy = distY-paddle.height / 2;

      return (dx * dx + dy * dy <= ( ball.radius * ball.radius));
    }
    if (paddleBallColliding(this, player.paddle)) {
      laserSound.load();
      laserSound.play();
      this.speedX *= -1.00001;
      this.speedY *= Math.random() + 1;
    } else if (paddleBallColliding(this, opponent.paddle)) {
      laserSound.load();
      laserSound.play();
      this.speedY *= Math.random() + 1;
      this.speedX *= -1.00001;
    }
    if(ball.x < 0) {
      opponent.score += 1;
      opponent.scored = true;
      ball.x = court.width / 2;
      ball.y = court.height / 2;
      ball.radius = 5;
      ball.startAngle = 0;
      ball.endAngle = 2 * Math.PI;
      ball.speedX = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 10 + 2);
      ball.speedY = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 5);
    } else if(ball.x > court.width) {
      player.score += 1;
      player.scored = true;
      ball.x = court.width / 2;
      ball.y = court.height / 2;
      ball.radius = 5;
      ball.startAngle = 0;
      ball.endAngle = 2 * Math.PI;
      ball.speedX = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 10 + 2);
      ball.speedY = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 5);
    }
  };

  render() {
    courtContext.beginPath();
    courtContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
    courtContext.lineWidth = 10;
    courtContext.strokeStyle = 'red';
    courtContext.stroke();
    courtContext.closePath();
  };

};
