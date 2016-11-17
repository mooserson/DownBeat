import Hero from './lib/hero';
import {buildPlatform, updatePlatform} from './lib/platform';

var walker = new Image();
var hero;
var platforms = [];
window.platforms = platforms;

document.addEventListener("DOMContentLoaded", function() {
  var stage = new createjs.Stage("canvas");
  walker.onload = imageLoaded;
  walker.src = 'assets/walker.png';

  // x, y, width, height
  function imageLoaded () {
    var data = {
      images: [walker],
      frames: [
        [9, 8, 30, 32],
        [59, 8, 30, 32],
        [109, 8, 30, 32],
        [159, 8, 30, 32],
        [209, 8, 30, 32],
        [259, 8, 30, 32],
        [309, 8, 30, 32],
        [359, 8, 30, 32],
        [409, 8, 30, 32],
        [459, 8, 30, 32],
        [509, 8, 30, 32],
        [559, 8, 30, 32],
        [9, 58, 31, 32],
        [59, 58, 31, 32],
        [109, 58, 31, 32],
        [159, 58, 31, 32],
        [209, 58, 31, 32],
        [259, 58, 31, 32],
        [309, 58, 31, 32]
      ],
      animations: {
        run: [0,11],
        jump: [12,18],
        holdJump: 18
      }
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    hero = new Hero(spriteSheet);
    stage.addChild(hero);
    let newPlatform = buildPlatform(100, 500);
    let floor  = buildPlatform(100, 598);
    platforms.push(newPlatform);
    platforms.push(floor);
    stage.addChild(newPlatform);
    stage.addChild(floor);
  }

  createjs.Ticker.addEventListener("tick", tick);
  function tick() {
    hero.tick(platforms);
    // updatePlatform(platforms[0]);
    window.hero = hero;
    stage.update();
  }
});
