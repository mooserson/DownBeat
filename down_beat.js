import Hero from './lib/hero';
import Platform from './lib/platform';
import Score from './lib/score';
import {buildStage} from './lib/level';
import {pauseScreen} from './lib/screen_text';

var walker = new Image();
var hero;
var stage;
var score;
var pauseText;
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
    pauseText = pauseScreen();
    stage.addChild(pauseText);
    stage.setChildIndex(pauseText, stage.getNumChildren()-1);
    stage.addChild(hero, score.currentScore, score.topScore);
    stage.setChildIndex(hero, stage.getNumChildren()-1);
    window.hero = hero;
    window.score = score;
    start();
  }
});

function tick(event) {


  if (hero.started) {
    pauseText.alpha = 0;
    checkForScore();
    Platform.tick(window.platforms);
    hero.play();
  } else {
    hero.stop();
    pauseText.alpha = 1;
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
  // let canvasWrapper = document.getElementsByClassName("canvas-wrapper")[0];
  // canvasWrapper.addEventListener("blur", () => {console.log("blur");});
  // canvasEl.addEventListener("focusout", checkCanvas);
  buildStage(window.platforms);
}
