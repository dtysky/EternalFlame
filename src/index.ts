/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import config from './config';
import Game from './Game';
import {init, preload} from './states';

class SimpleGame {
  private game: Game;

  constructor() {
    this.game = new Game(config.width, config.height, Phaser.AUTO, 'content');
    this.game.state.add('init', init);
    this.game.state.add('preload', preload);

    this.game.state.start('init');
  }
}

window.onload = () => {
  const game = new SimpleGame();
};
