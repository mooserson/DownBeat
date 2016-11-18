import Platform from './platform';

export const buildStage = (platforms) => {
  if (platforms.length === 0) {
    let floor = new Platform(100, 590);
    floor.direction = "floor";
    platforms.push(floor);
    window.stage.addChild(floor);
  }
  let highestPlatY = platforms[platforms.length - 1].getBounds().y;
  while (highestPlatY > 100) {
    let posX = Math.random() * (380 - 50) + 20;
    let posY = highestPlatY - (Math.random() * (130 - 100) + 80);
    let newPlatform = new Platform(posX, posY);
    platforms.push(newPlatform);
    window.stage.addChild(newPlatform);
    highestPlatY = platforms[platforms.length - 1].getBounds().y;
  }
};
