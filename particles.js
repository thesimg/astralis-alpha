var snow = [];
var snowflake = function() {
  (this.x = random(p.x - windowWidth * (1 / 3))), p.x + windowWidth * 3;
  this.y = random(p.y - windowHeight / (2 / 3), p.y + windowHeight * (2 / 3));

  this.xvel = random(-18, -12);
  this.yvel = random(6, 10);

  this.rvel = random(0.01, 0.05);

  this.r = 0;

  this.t = round(random(0, 4));

  this.size = random(5, 10);

  snowflake.prototype.draw = function() {
    fill(255);
    noStroke();
    translate(this.x, this.y);
    rotate(this.r);
    rect(0, 0, 5, 5);
    rotate(-this.r);
    translate(-this.x, -this.y);
  };
  snowflake.prototype.move = function() {
    this.x += this.xvel;
    this.y += this.yvel;

    this.r += this.rvel;

    if (this.y > windowHeight + 200) {
      this.x = random(p.x - windowWidth * (1 / 3), p.x + windowWidth * 4);
      this.y = random(p.y - 500, p.y - 300);

      this.xvel = random(-18, -12);
      this.yvel = random(6, 10);

      this.rvel = random(0.01, 0.05);

      this.r = 0;
    }
  };
  snowflake.prototype.pack = function() {
    this.draw();
    this.move();
  };
};
//}snow
