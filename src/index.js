import './css/style.css';
import GamePlay from './js/GamePlay';
import GameController from './js/GameController';
import TableSorter from './js/table';

document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.createElement('div');
  document.body.appendChild(gameContainer);

  const gamePlay = new GamePlay();
  gamePlay.bindToDOM(gameContainer);
  const gameController = new GameController(gamePlay);
  gameController.init();

  const tableContainer = document.createElement('div');
  document.body.appendChild(tableContainer);
  const tableSorter = new TableSorter(tableContainer);
  tableSorter.init();
});