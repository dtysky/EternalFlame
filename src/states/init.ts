/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import config, {resources} from '../config';
import {loadAssets} from '../utils';

export default class Init extends Phaser.State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public preload() {
    console.log('init');
    this.game.load.path = config.assetsBasePath;
    this.game.init();
    loadAssets(this.game, resources.loading);
    this.game.load.start();
  }

  public create() {
    this.game.state.start('preload');
  }
}
