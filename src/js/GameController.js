import goblinImg from '../img/goblin.png';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.score = 0;
    this.miss = 0;
    this.currentPosition = null;
    this.timerId = null;
    this.isGoblinLocked = false;
  }

  init() {
    this.gamePlay.drawUi();
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.startGame();
  }

  startGame() {
    this.score = 0;
    this.miss = 0;
    this.gamePlay.updateStats(this.score, this.miss);
    
    this.timerId = setInterval(() => {
      this.nextTurn();
    }, 1000);
    
    this.nextTurn();
  }

  nextTurn() {
    if (this.isGoblinLocked) {
      this.miss += 1;
      this.gamePlay.updateStats(this.score, this.miss);
      
      if (this.miss >= 5) {
        this.gameOver();
        return;
      }
    }

    let newPosition = Math.floor(Math.random() * 16);
    while (newPosition === this.currentPosition) {
      newPosition = Math.floor(Math.random() * 16);
    }

    this.currentPosition = newPosition;
    this.isGoblinLocked = true;

    const img = document.createElement('img');
    img.src = goblinImg;
    img.classList.add('goblin');

    this.gamePlay.redrawPositions(this.currentPosition, img);
  }

  onCellClick(index, hasGoblin) {
    if (this.timerId === null) return;

    if (hasGoblin && this.isGoblinLocked) {
      this.score += 1;
      this.isGoblinLocked = false;
      this.gamePlay.redrawPositions(null); 
      this.gamePlay.updateStats(this.score, this.miss);
    }
  }

  gameOver() {
    clearInterval(this.timerId);
    this.timerId = null;
    alert(`Game Over! Your score: ${this.score}`);
  }
}