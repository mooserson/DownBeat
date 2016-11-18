const spawnX = 100;
const spawnY = 550;

class Hero extends createjs.Sprite{
  constructor(sprite) {
    super(sprite);
    this.bindKeyHandlers();
    this.gotoAndPlay("run");
    this.resetPosition();
    this.snapToPixel = true;
    this.checkCollisions = this.checkCollisions.bind(this);
    this.grounded = false;
    this.started = false;
    this.jumping = false;
    this.canScore = false;
  }

  resetPosition() {
    this.velocity = {x: 0, y: 5};
    this.x = spawnX;
    this.y = spawnY;
    this.started = false;
    this.cannotScore();
  }

  run(dir) {
    this.start();
    if (Math.abs(this.velocity.x) < 7) {
      switch (dir) {
        case 'left':
          this.velocity.x -= 3;
          break;
        case 'right':
          this.velocity.x += 3;
          break;
      }
    }
  }

  jump() {
    this.start();
    if (this.grounded) {
      this.velocity.y -= 15;
      this.grounded = false;
    }
  }

  tick(platforms) {
    let nextPos = this.nextPosition(platforms);
    this.x = nextPos[0];
    this.y = nextPos[1];
    this.onPlatform(platforms);
    this.applyGravity();
    this.checkCanScore();
    if (this.y > 610) {
      this.resetPosition();
    }
  }

  nextPosition(platforms) {
    let collision;
    if (!this.grounded) {
      collision = this.checkCollisions(platforms);
      if (collision) {
        return this.collisionPosition(collision);
      }
    }
    return [this.x + this.velocity.x, this.y + this.velocity.y];
  }


  checkCollisions(platforms) {
    if (platforms && this.velocity.y > 0) {
      for (let ii = 0; ii < platforms.length; ++ii) {
        if (this.checkCollision(platforms[ii])) {
          return platforms[ii];
        }
      }
    }
    return null;
  }

  checkCollision(platform) {
    let m = this.velocity.y / this.velocity.x;
    let platX = platform.getBounds().x;
    let platY = platform.getBounds().y;
    let platWidth = platform.getBounds().width;
    let platHeight = platform.getBounds().height;

    let heroX = this.x;
    let heroY = this.y;
    let heroWidth = this.getBounds().width / 2;
    let heroHeight = this.getBounds().height;

    if (heroY + heroHeight + this.velocity.y < platY
      || heroY + heroHeight > platY
    ) {
      return false;
    }

    if (this.velocity.x === 0) {
      // We only use velocity in the third check because
      // we are checking whether the hero will cross a platform
      // in the span of its movement this tick
      if (
        this.x + heroWidth > platX
        && this.x < platX + platWidth
        && this.y + this.velocity.y + heroHeight > platY
        && this.y < platY + platHeight
      ) {
        return true;
      }
      return false;
    }

    if (
      platX + platWidth > heroX + this.velocity.x
      && platX < heroX + heroWidth + this.velocity.x
      && (
        platY + platHeight > m * (platX - heroX) + heroY
        || platY + platHeight > m * (platX + platWidth - heroX) + heroY
      ) && (
        platY < m * (platX - heroX) + heroY + heroHeight
        || platY < m * (platX + platWidth - heroX - heroWidth) + heroY + heroHeight
      )
    ) {
      return true;
    }
    return false;
  }

  collisionPosition(platform) {
    let m = this.velocity.y / this.velocity.x;
    let platY = platform.getBounds().y;
    let heroX = this.x;
    let heroY = this.y;
    let height = this.getBounds().height;

    if (this.velocity.x === 0) {
      this.velocity.y = 0;
      return [heroX, platY - height] ;
    }

    let newX = (platY - heroY) / m + heroX;
    this.velocity.y = 0;
    if (this.velocity.x > 0) this.velocity.x -= 2;
    if (this.velocity.x < 0) this.velocity.x += 2 ;
    this.grounded = true;
    return [heroX, platY - height];
  }

  onPlatform(platforms) {
    let match = false;
    for (let i = 0; i < platforms.length; ++i) {
      let platBounds = platforms[i].getBounds();
      let heroBounds = this.getBounds();
      if (
        this.x + heroBounds.width >= platBounds.x
        && this.x <= platBounds.x + platBounds.width
        && this.y + heroBounds.height === platBounds.y
      ) {
        this.grounded = true;
        return;
      }
    }
    this.grounded = false;
  }

  applyGravity() {
    if (this.grounded === false) {
      this.velocity.y += 1;
      if (this.jumping === false) {
        this.gotoAndPlay("jump");
        this.gotoAndStop("holdJump");
        this.jumping = true;
      }
    } else {
      this.velocity.y = 0;
      if (this.velocity.x > 0) this.velocity.x -= 1;
      if (this.velocity.x < 0) this.velocity.x += 1;
      if (this.jumping === true) {
        this.gotoAndPlay("run");
        this.jumping = false;
      }
    }
  }

  checkCanScore() {
    let topPlat = window.platforms[
      window.platforms.length - 1
    ].getBounds();
    if (this.y + 32 === topPlat.y) {
      this.canScore = true;
    }
  }

  cannotScore() {
    this.canScore = false;
  }

  start() {
    this.started = true;
  }

   bindKeyHandlers() {
    key('left', () => this.run('left'));
    key('right', () => this.run('right'));
    key('space', () => this.jump());
  }
}

export default Hero;
