/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import config from '../config';

export default class Preload {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public preload() {
    console.log('preload');
    this.game.load.path = config.assetsBasePath;
    this.game.load.image('logo', '/assets/o.png');
  }

  public create() {
    const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');

    logo.anchor.setTo(0.5, 0.5);
    // this.game.state.start('title');
  }
}
