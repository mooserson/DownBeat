
class Platform extends createjs.Shape{
  constructor(x, y) {
    var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(x, y, 100, 10);
    super(graphics);
    this.setBounds(x, y, 100, 50);
    this.direction = this._setDirection();
    this.velocity = 2;

  }

  _setDirection() {
    let num = Math.random();
    if (num > .5) {
      return "right";
    } else {
      return "left";
    }
  }

  _increaseVelocity() {
    if (window.score.points > 0) {
      this.velocity = 2 + window.score.points * .5;
    }
  }

  static _swapDirection(platform) {
    if (platform.direction === "right") {
      platform.direction = "left";
    } else {
      platform.direction = "right";
    }
  }

  static highlightObjective() {
    let bottomPlat = window.platforms[0];
    let topPlat = window.platforms[
      window.platforms.length - 1
    ];
    if (window.hero.canScore) {
      bottomPlat.graphics._fill.style = "lightblue";
      topPlat.graphics._fill.style = "red";
    } else {
      topPlat.graphics._fill.style = "lightblue";
      bottomPlat.graphics._fill.style = "red";
    }
  }

  static tick(platforms) {
    Platform.highlightObjective();
    platforms.forEach(platform => {
      platform._increaseVelocity();
      if (platform.getBounds().x < -50 || platform.getBounds().x > 350) {
        Platform._swapDirection(platform);
      }
      if (platform.direction === "right") {
      platform.x += platform.velocity;
      platform.setBounds(
      platform.getBounds().x + platform.velocity,
      platform.getBounds().y,
      100,
      50);
    } else if(platform.direction === "left") {
      platform.x -= platform.velocity;
      platform.setBounds(
      platform.getBounds().x - platform.velocity,
      platform.getBounds().y,
      100,
      50);
    }
    });
  }
}

export default Platform;
