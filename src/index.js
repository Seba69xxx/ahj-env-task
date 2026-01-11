import './css/style.css';
import Game from './js/game';
import TableSorter from './js/table';

document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.createElement('div');
  document.body.append(gameContainer);
  const game = new Game(gameContainer);
  game.init();

  const tableContainer = document.createElement('div');
  document.body.append(tableContainer);
  const tableSorter = new TableSorter(tableContainer);
  tableSorter.init();
});