class Hero extends createjs.Sprite{
  constructor(sprite) {
    super(sprite);
    this.bindKeyHandlers();
    this.velocity = {x: 0, y: 5};
    this.x = 100;
    this.y = 550;
    this.gotoAndPlay("run");
    this.snapToPixel = true;
    window.hero = this;
    this.checkCollisions = this.checkCollisions.bind(this);
    this.checkGrounded = this.checkGrounded.bind(this);
    this.grounded = false;
  }

  run(dir) {
    if (this.grounded) {
      // this.gotoAndPlay("run");
    }

    if (Math.abs(this.velocity.x < 7)) {
      switch (dir) {
        case 'left':
          this.velocity.x -= 7;
          break;
        case 'right':
          this.velocity.x += 7;
          break;
      }
    }
  }

  jump() {
    if (this.grounded) {
      this.velocity.y -= 15;
      this.grounded = false;
      // this.gotoAndPlay("jump");
      // this.gotoAndStop("holdJump");
    }
  }

  tick(platforms) {
    let nextPos = this.nextPosition(platforms);
    this.x = nextPos[0];
    this.y = nextPos[1];
    this.onPlatform(platforms);
    this.applyGravity();

    if (this.y > 610) {
      this.x = 100;
      this.y = 550;
    }
  }

  nextPosition(platforms) {
    let collision;
    if (!this.grounded) {
      collision = this.checkCollisions(platforms);

      if (collision) {
        //check that next render hero will ghost through collision platform
        if (this.y + this.getBounds().height + this.velocity.y >= collision.getBounds().y) {
          return this.collisionPosition(collision);
        }
      }
    }
    return [this.x + this.velocity.x, this.y + this.velocity.y];
  }

  checkCollisions(platforms) {
    let collision = false;
    if (platforms && this.velocity.y > 0) {
      platforms.forEach(platform => {
        if (this.checkCollision(platform)) {
          collision = platform;
          return;
        }
      });
    }
    return collision;
  }

  checkCollision(platform) {
    let m = this.velocity.y / this.velocity.x;
    let platX = platform.getBounds().x;
    let platY = platform.getBounds().y;
    let platWidth = platform.getBounds().width;
    let platHeight = platform.getBounds().height;

    let heroX = this.x;
    let heroY = this.y;
    let heroWidth = this.getBounds().width;
    let heroHeight = this.getBounds().height;
    if (this.velocity.x === 0) {
      if ((this.x + heroWidth >= platX &&
      this.x <= platX + platWidth) &&
      (this.y + heroHeight <= platY)) {
        return true;
      }
      return false;
    }
    if (platX + platWidth >= heroX &&
        platX <= heroX + this.velocity.x &&
        ((platY + platHeight >= m * (platX - heroX) + heroY) ||
        (platY + platHeight >= m * (platX + platWidth - heroX) + heroY)) &&
        ((platY <= m * (platX - heroX) + heroY) ||
        (platY <= m * (platX + platWidth - heroX) + heroY))
        ) {
          return true;
        }
    return false;
  }

  collisionPosition(platform) {
    let m = this.velocity.y / this.velocity.x;
    let platY = platform.getBounds().y;
    let platHeight = platform.getBounds().height;
    let heroX = this.x;
    let heroY = this.y;

    if (this.velocity.x === 0) {
      this.velocity.y = 0;
      return [heroX, platY] ;
    }

    let newX = (platY - heroY) / m + heroX;
    this.velocity.y = 0;
    this.grounded = true;
    return [newX, platY];
  }

  onPlatform(platforms) {
    platforms.forEach( platform => {
      let platBounds = platform.getBounds();
      let heroBounds = this.getBounds();
      if (
        this.x + heroBounds.width >= platBounds.x &&
        this.x <= platBounds.x + platBounds.width &&
        this.y + heroBounds.height === platBounds.y - 1) {
          this.grounded = true;
          return;
        }
    });
    this.grounded = false;
  }

  applyGravity() {
    if (this.grounded === false) {
      this.velocity.y += 1;
    } else {
      this.velocity.y = 0;
      if (this.velocity.x > 0) this.velocity.x -= 1;
      if (this.velocity.x < 0) this.velocity.x += 1;
    }
  }

  checkGrounded(platforms) {
    this.onPlatform(platforms);
  }

   bindKeyHandlers() {
    key('left', () => this.run('left'));
    key('right', () => this.run('right'));
    key('space', () => this.jump());
  }
}

export default Hero;
