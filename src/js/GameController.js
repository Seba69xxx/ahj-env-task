import goblinImg from '../img/goblin.png';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.score = 0;
    this.miss = 0;
    this.currentPosition = null;
    this.timerId = null;
    this.isGoblinLocked = false;
    this.maxMisses = 5;
    this.cellsCount = 16;
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
      
      if (this.miss >= this.maxMisses) {
        this.gameOver();
        return;
      }
    }

    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.cellsCount);
    } while (newPosition === this.currentPosition);

    this.currentPosition = newPosition;
    this.isGoblinLocked = true;

    const img = document.createElement('img');
    img.src = goblinImg;
    img.alt = 'Goblin';
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
    this.gamePlay.showGameOver(this.score);
  }
}