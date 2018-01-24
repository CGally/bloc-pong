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
