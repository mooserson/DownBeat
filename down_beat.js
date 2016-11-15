


var imgMonsterARun = new Image();
var canvas;
var stage;
var screen_width;
var screen_height;
var bmpAnimation;

document.addEventListener("DOMContentLoaded", function() {
  canvas = document.getElementById("canvas");
  imgMonsterARun.onload = handleImageLoad;
  imgMonsterARun.onerror = handleImageError;
  imgMonsterARun.src = "walker.png";
});

function handleImageLoad(e) {
    startGame();
}

function startGame() {
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);

	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;

    // create spritesheet and assign the associated data.
	var spriteSheet = new createjs.SpriteSheet({
	    // image to use
	    images: [imgMonsterARun],
	    // width, height & registration point of each sprite
	    frames: {width: 16, height: 18, regX: 5, regY: 1},
	    animations: {
		    walk: [0, 11, "walk"]
	    }
    });

    // create a BitmapAnimation instance to display and play back the sprite sheet:
	bmpAnimation = new createjs.BitmapAnimation(spriteSheet);

    // start playing the first sequence:
    bmpAnimation.gotoAndPlay("walk"); 	//animate

    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimation.shadow = new createjs.Shadow("#454", 0, 5, 4);

    bmpAnimation.name = "monster1";
    bmpAnimation.direction = 90;
    bmpAnimation.vX = 4;
    bmpAnimation.x = 16;
    bmpAnimation.y = 32;

    // have each monster start at a specific frame
    bmpAnimation.currentFrame = 0;
    stage.addChild(bmpAnimation);

    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addListener(stage);
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}

window.start = startGame;
//called if there is an error loading the image (usually due to a 404)
function handleImageError(e) {
	console.log("Error Loading Image : " + e.target.src);
}

function tick() {
    // Hit testing the screen width, otherwise our sprite would disappear
    if (bmpAnimation.x >= screen_width - 16) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        bmpAnimation.direction = -90;
    }

    if (bmpAnimation.x < 16) {
        // We've reached the left side of our screen
        // We need to walk right now
        bmpAnimation.direction = 90;
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimation.direction == 90) {
        bmpAnimation.x += bmpAnimation.vX;
    }
    else {
        bmpAnimation.x -= bmpAnimation.vX;
    }

    // update the stage:
    stage.update();
}





// var circle = new createjs.Shape();
// circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
// circle.x = 50;
// circle.y = 100;
// stage.addChild(circle);
// stage.update();
// createjs.Ticker.addEventListener("tick", tick);
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
