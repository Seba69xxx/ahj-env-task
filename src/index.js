import './css/style.css';
import Game from './js/game';
import TableSorter from './js/table';

document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.createElement('div');
  document.body.appendChild(gameContainer);
  const game = new Game(gameContainer);
  game.init();

  const tableContainer = document.createElement('div');
  document.body.appendChild(tableContainer);
  const tableSorter = new TableSorter(tableContainer);
  tableSorter.init();
});