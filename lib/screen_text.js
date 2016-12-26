export const pauseScreen = () => {
  let pauseText = new createjs.Text(
    "    Get to the top! \n         Controls: \n [<-] [SPACE-BAR] [->]",
    "bold 25px Bungee Inline",
    "white");

    pauseText.x = 50;
    pauseText.y = 270;
    return pauseText;
};

export const reachTop = () => {
  let reachTopText = new createjs.Text(
    "Get back to the bottom!",
    "bold 25px Bungee Inline",
    "white"
  );
}
