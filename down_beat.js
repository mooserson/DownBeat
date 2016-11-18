import Hero from './lib/hero';
import Platform from './lib/platform';
import {buildStage} from './lib/level';
import Score from './lib/score';

var walker = new Image();
var hero;
var stage;
var score;
window.platforms = [];

document.addEventListener("DOMContentLoaded", function() {
  stage = new createjs.Stage("canvas");
  window.stage = stage;
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
    score = new Score;
    stage.addChild(hero, score.currentScore, score.topScore);
    window.hero = hero;
    window.score = score;
    start();
  }
});

function tick() {
  if (hero.started) {
    checkForScore();
    Platform.tick(window.platforms);
    hero.play();
  } else {
    hero.stop();
    score.resetScore();
  }
  score.tick();
  hero.tick(window.platforms);
  stage.update();
}

function checkForScore() {
  let bottomPlat = window.platforms[0].getBounds();
  if (hero.canScore) {
    if (hero.y + 32 === bottomPlat.y) {
      score.addPoint();
      hero.cannotScore();
    }
  }
}

function start() {
  createjs.Ticker.addEventListener("tick", tick);
  buildStage(window.platforms);
}
