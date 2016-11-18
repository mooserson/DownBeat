export const pauseScreen = () => {
  let pauseText = new createjs.Text(
    "Move to begin!",
    "bold 25px Bungee Inline",
    "white");

    pauseText.x = 100;
    pauseText.y = 270;
    return pauseText;
};
