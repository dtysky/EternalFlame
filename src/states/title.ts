/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';

export default class Title extends Phaser.State {
  public game: Game;
  private startButton: Phaser.Button;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public create() {
    console.log('title');
    this.startButton = this.add.button(0, 0, 'start-game', this.handleStart, this);
  }

  public handleStart = () => {
    this.game.init();
    this.startButton.destroy();
    this.game.state.start('main');
  }
}
