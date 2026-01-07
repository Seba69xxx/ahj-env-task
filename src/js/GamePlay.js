export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.scoreEl = null;
    this.missEl = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.container.innerHTML = `
      <div class="status-bar">
        <div>Score: <span id="score">0</span></div>
        <div>Miss: <span id="miss">0</span>/5</div>
      </div>
      <div class="game-container"></div>
    `;

    this.boardEl = this.container.querySelector('.game-container');
    this.scoreEl = this.container.querySelector('#score');
    this.missEl = this.container.querySelector('#miss');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.boardEl.appendChild(cell);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  redrawPositions(position, imgElement) {
    const currentGoblin = this.boardEl.querySelector('.goblin');
    if (currentGoblin) {
      currentGoblin.remove();
    }
    
    if (position !== null) {
      this.cells[position].appendChild(imgElement);
    }
  }

  updateStats(score, miss) {
    this.scoreEl.textContent = score;
    this.missEl.textContent = miss;
  }

  addCellClickListener(callback) {
    this.boardEl.addEventListener('click', (event) => {
      const target = event.target;
      const index = this.cells.indexOf(target);
      const hasGoblin = target.querySelector('.goblin') || target.classList.contains('goblin');
      callback(index, hasGoblin);
    });
  }
}