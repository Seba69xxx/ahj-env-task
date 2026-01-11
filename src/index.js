import './css/style.css';
import GamePlay from './js/GamePlay';
import GameController from './js/GameController';

document.addEventListener('DOMContentLoaded', () => {
  const gamePlay = new GamePlay();
  gamePlay.bindToDOM(document.querySelector('body'));

  const gameController = new GameController(gamePlay);
  gameController.init();
});