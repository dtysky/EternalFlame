/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';

export default class Result extends Phaser.State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public create() {
    console.log('result');
    this.game.state.start('title');
  }
}
