

var walker = new Image();
var walkerBitmap;
var hero;
document.addEventListener("DOMContentLoaded", function() {
  var stage = new createjs.Stage("canvas")
  walker.onload = imageLoaded;
  walker.src = 'assets/walkerbig.png';

  createjs.Ticker.addEventListener("tick", tick);
  function tick() {
    if (hero.y < 570) {
      hero.velocity.y += 1;
    } else {
      hero.velocity.y = 0;
    }

    hero.y += hero.velocity.y;
    stage.update();
  }



  function imageLoaded () {
    var data = {
      images: [walker],
      frames: {width:32, height:36, regX: 11, regY: 3, spacing: 18},
      animations: {
        run: [0,11]
      }
    };

    var spriteSheet = new createjs.SpriteSheet(data);
    hero = new createjs.Sprite(spriteSheet);
    hero.gotoAndPlay("run");
    hero.velocity = {x: 0, y: 10}
    stage.addChild(hero);
    window.hero = hero;
  }

  bindKeyHandlers();



});
  //
  function bindKeyHandlers() {
    key('left', () => {hero.velocity.x -= 5});
    key('right', () => {hero.velocity.x += 5});
    key('space', () => {hero.velocity.y -= 20});
  }
  //
  // animation.x = 100;
  // animation.y = 100;




// var circle = new createjs.Shape();
// circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
// circle.x = 50;
// circle.y = 100;
// stage.addChild(circle);
// stage.addChild(circle);
// stage.update();
// key('a', function(){circle.x -= .5});
// key('d', function(){circle.x += .5});
// key('w', function(){circle.y -= .5});
// key('s', function(){circle.y += .5});
// key('w+d', function(){
//   circle.y += .5;
//   circle.x += .5;
// });
// window.key = key
// function tick () {
//   if (circle.x > stage.canvas.width + 50) {
//     circle.x = 50;
//     circle.y = 100;
//   }
//   stage.update();
//   console.log(circle.x, circle.y);
//  }
