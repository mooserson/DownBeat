
document.addEventListener("DOMContentLoaded", function() {
  // const canvasEl = documentGetContentById("main-canvas");
  var stage = new createjs.Stage("main-canvas");
  var circle = new createjs.Shape();
  circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  circle.x = -50;
  circle.y = 100;
  stage.addChild(circle);
  stage.update();
  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setInterval(10);
  function tick () {
    circle.x += 5;
    if (circle.x > stage.canvas.width + 50) {
      circle.x = -20;
    }
    stage.update();
   }
});
