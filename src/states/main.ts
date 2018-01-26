/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';

export default class Main {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    console.log('main');
  }
}
