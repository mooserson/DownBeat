class Score {
  constructor(text = "Score: ") {
    this.currentScore = new createjs.Text(text + 0, "bold 30px Arial", "white");
    this.topScore = new createjs.Text("Top: " + 0, "bold 20px Arial", "white");
    this.topScore.y = 25;
    this.points = 0;
    this.topPoints = 0;
  }

  resetScore() {
    this.points = 0;
  }

  addPoint() {
    this.points += 1;
  }

  checkHighscore(){
    if (this.points > this.topPoints) {
      this.topPoints = this.points;
      this.topScore.text = "Top: " + this.topPoints;
    }
  }

  tick() {
    this.currentScore.text = "Score: " + this.points;
    this.checkHighscore();
  }

}

export default Score;
