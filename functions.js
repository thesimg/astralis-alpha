function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}

var keys = [];
keyPressed = function() {
  keys[keyCode] = true;
};
keyReleased = function() {
  keys[keyCode] = false;
};

var platform = function(x, y, w, h, type, destroyCounter) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.type = type || "normal";
  this.touchCounter = 0;
  this.hasTouched = false;
  this.destroyCounter = destroyCounter;
  this.toDestroy = false;
};
platform.prototype.draw = function() {
  stroke(255);
  strokeWeight(2);
  fill(0);
  rect(this.x, this.y, this.w, this.h, 3);

  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(15);
  switch (this.type) {
    case "vanishing":
      text("!", this.x + this.w / 2, this.y + this.h / 2 + 5);
      break;
    case "broken":
      text("~", this.x + this.w / 2, this.y + this.h / 2 + 5);
      break;
  }
  textAlign(CORNER);
  //text(this.touchCounter, this.x + 10, this.y + 10);
};
platform.prototype.collide = function() {
  if (
    p.x + p.w > this.x &&
    p.y + p.h > this.y &&
    p.x < this.x + this.w &&
    p.y < this.y + this.h
  ) {
    p.gravity = 0;
    p.jumpable = true;
    this.hasTouched = true;
    //p.dashAllowed = true;
    if (p.previous.x + p.w <= this.x) {
      p.x = this.x - p.w;
      p.sticking = "left";
    } else if (p.previous.y + p.h <= this.y) {
      p.y = this.y - p.h;
      p.sticking = "top";
    } else if (p.previous.x >= this.x + this.w) {
      p.x = this.x + this.w;
      p.sticking = "right";
    } else if (p.previous.y >= this.y + this.h) {
      p.y = this.y + this.h;
      p.sticking = "bottom";
    }
  }
  if (this.hasTouched && p.sticking === false) {
    this.touchCounter++;
    this.hasTouched = false;
  }
};
platform.prototype.pack = function() {
  if (dist(this.x + this.w / 2, this.y + this.h / 2, p.x, p.y) < 500) {
    this.collide();
  }
  if (Math.abs(p.y - this.y) < windowHeight*(4/3) && Math.abs(p.x - this.x) < windowWidth*(4/3)) {
    this.draw();
  }
  switch (this.type) {
    case "broken":
      if (this.touchCounter >= this.destroyCounter) {
        this.toDestroy = true;
      } else {
        this.toDestroy = false;
      }
      break;
    case "vanishing":
      if (this.touchCounter > 0) {
        this.toDestroy = true;
      } else {
        this.toDestroy = false;
      }
      break;
  }
};

var portal = function(x, y, w, h, to) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.to = to;
  this.toDestroy = false;
};
portal.prototype.draw = function() {
  noStroke();
  fill(255);
  rect(this.x, this.y, this.w, this.h, 3);
};
portal.prototype.collide = function() {
  if (
    p.x + p.w > this.x &&
    p.y + p.h > this.y &&
    p.x < this.x + this.w &&
    p.y < this.y + this.h
  ) {
    this.toDestroy = true;
    switchScene(this.to);
  }
};
portal.prototype.pack = function() {
  this.draw();
  this.collide();
};

var chunk = function(x, y, w, h, theta, blockW, blockH, type, mode) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.blockW = blockW;
  this.blockH = blockH;
  this.theta = theta;
  this.type = type + theta;
  // /round(1 + random(8)), round(1 + random(8)), round(random(9))
};
chunk.prototype.draw = function() {
  noFill();
  strokeWeight(2);
  stroke(0);
  rectMode(CORNER);
  rect(this.w, this.h, this.x, this.y);
};
chunk.prototype.generate = function() {
  switch (this.type) {
    case 0: //normal
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      blocks.push(
        new platform(
          this.x +
            round(random((this.w - this.blockW * blockSize) / blockSize)) *
              blockSize,
          this.y +
            round(random((this.h - this.blockW * blockSize) / blockSize)) *
              blockSize,
          this.blockW * blockSize,
          this.blockH * blockSize,
          "normal"
        )
      );
      if (round(random(5)) <= 1) {
        this.blockW = round(1 + random(8));
        this.blockH = round(1 + random(8));
        blocks.push(
          new platform(
            this.x +
              round(random((this.w - this.blockW * blockSize) / blockSize)) *
                blockSize,
            this.y +
              round(random((this.h - this.blockW * blockSize) / blockSize)) *
                blockSize,
            this.blockW * blockSize,
            this.blockH * blockSize,
            "normal"
          )
        );
      }
      /*blockData.push({
        y:
          this.x +
          round(random((this.w - this.blockW * blockSize) / blockSize)) *
            blockSize,
        y:
          this.y +
          round(random((this.h - this.blockW * blockSize) / blockSize)) *
            blockSize,
        w: this.blockW * blockSize,
        h: this.blockH * blockSize,
        type: "normal",
        destroyCounter: round(2 + random(3)),
        mode: this.mode
      });
      if (round(random(5)) <= 1) {
        this.blockW = round(1 + random(8));
        this.blockH = round(1 + random(8));
        blockData.push({
          y:
            this.x +
            round(random((this.w - this.blockW * blockSize) / blockSize)) *
              blockSize,
          y:
            this.y +
            round(random((this.h - this.blockW * blockSize) / blockSize)) *
              blockSize,
          w: this.blockW * blockSize,
          h: this.blockH * blockSize,
          type: "normal",
          destroyCounter: round(2 + random(3)),
          mode: this.mode
        });
      }*/
      break;
    case 7: //broken
    case 8:
    case 9:
      blocks.push(
        new platform(
          this.x +
            round(random((this.w - this.blockW * blockSize) / blockSize)) *
              blockSize,
          this.y +
            round(random((this.h - this.blockW * blockSize) / blockSize)) *
              blockSize,
          this.blockW * blockSize,
          this.blockH * blockSize,
          "broken"
        )
      );
      /*blockData.push({
        y:
          this.x +
          round(random((this.w - this.blockW * blockSize) / blockSize)) *
            blockSize,
        y:
          this.y +
          round(random((this.h - this.blockW * blockSize) / blockSize)) *
            blockSize,
        w: this.blockW * blockSize,
        h: this.blockH * blockSize,
        type: "broken",
        destroyCounter: round(2 + random(3)),
        mode: this.mode
      });*/
      break;
    case 8: //vanishing
    case 9:
      blocks.push(
        new platform(
          this.x +
            round(random((this.w - this.blockW * blockSize) / blockSize)) *
              blockSize,
          this.y +
            round(random((this.h - this.blockW * blockSize) / blockSize)) *
              blockSize,
          this.blockW * blockSize,
          this.blockH * blockSize,
          "vanishing"
        )
      );
      /*blockData.push({
        y:
          this.x +
          round(random((this.w - this.blockW * blockSize) / blockSize)) *
            blockSize,
        y:
          this.y +
          round(random((this.h - this.blockW * blockSize) / blockSize)) *
            blockSize,
        w: this.blockW * blockSize,
        h: this.blockH * blockSize,
        type: "vanishing",
        destroyCounter: round(2 + random(3)),
        mode: "traversal"
      });*/
      break;
  }
  this.generated = true;
};
chunk.prototype.pack = function() {
  if (Math.abs(p.y - this.y) < 2000 && Math.abs(p.x - this.x) < 3000) {
    this.draw();
  }
  if (!this.generated && dist(this.x, this.y, p.x, p.y) < 3000) {
    //print(this.type);
    this.generate();
  }
};

function switchScene(sceneTo) {
  chunks = [];
  blocks = [];
  blocks.push(new platform(-50, 0, 100, 20));
  p.x = -10;
  p.y = -50;
  p.gravity = 0;
  p.speed = 0;

  runTimer = 0;
  running = false;
  win = false;
  clearInterval(timerInterval);

  cleanTimer = 0;
  cleanRunTime = 0;
  minutes;
  seconds;
  milliseconds;

  generateBlocks(sceneTo);
  scene = sceneTo;
  //print(blocks);
}

function star(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}
star.prototype.draw = function() {
  fill(255, 255, 255);
  noStroke();
  ellipse(this.x, this.y, this.size, this.size);
};

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function regenWorld() {
  chunks = [];
  blocks = [];
  p.x = -10;
  p.y = -50;
  p.gravity = 0;
  p.speed = 0;

  runTimer = 0;
  running = false;
  win = false;
  clearInterval(timerInterval);

  cleanTimer = 0;
  cleanRunTime = 0;
  minutes;
  seconds;
  milliseconds;

  generateBlocks(scene);
}
