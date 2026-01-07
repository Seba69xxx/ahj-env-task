import goblinImg from '../img/goblin.png';

export default class Game {
  constructor(element) {
    this.element = element;
    this.boardSize = 4;
    this.activeCell = null;
  }

  init() {
    this.drawBoard();
    this.startGame();
  }

  drawBoard() {
    this.element.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('game-container');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      container.appendChild(cell);
    }

    this.element.appendChild(container);
    this.cells = Array.from(document.querySelectorAll('.cell'));
  }

  startGame() {
    const img = document.createElement('img');
    img.src = goblinImg;
    img.classList.add('goblin');

    setInterval(() => {
      this.moveGoblin(img);
    }, 1000);
  }

  moveGoblin(img) {
    let newIndex = Math.floor(Math.random() * this.cells.length);

    while (newIndex === this.activeCell) {
      newIndex = Math.floor(Math.random() * this.cells.length);
    }

    this.activeCell = newIndex;
    this.cells[newIndex].appendChild(img);
  }
}