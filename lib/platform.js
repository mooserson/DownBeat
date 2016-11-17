
class Platform extends createjs.Shape{
  constructor(x, y) {
    var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(x, y, 100, 10);
    super(graphics)
    this.setBounds(x, y, 100, 50)
  }
}

export const buildPlatform = (x, y) => {
  var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(x, y, 100, 10);
  var newPlatform = new createjs.Shape(graphics);
  newPlatform.setBounds(x, y, 100, 50);
  newPlatform.direction = Math.round(Math.random());
  return newPlatform;
};

export const updatePlatform = platform => {
  if(platform.direction) {
    platform.x += 5;
  } else {
    platform.x -= 5;
  }
  console.log(platform.x);
  if (platform.x < 0 || platform.x > 500) {
    platform.x = 200;
  }
};
