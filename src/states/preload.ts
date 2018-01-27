/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import config, {resources} from '../config';
import {loadAssets} from '../utils';
import Loading from '../components/Loading';

export default class Preload extends Phaser.State {
  public game: Game;
  private loading: Loading;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public preload() {
    console.log('preload');
    this.loading = new Loading(this.game);
    // this.game.stage.addChild(this.loading);

    this.game.load.onFileComplete.add(this.handleLoadProgress);
    this.game.load.onLoadComplete.addOnce(this.handleLoadComplete);
    loadAssets(this.game, resources.main);
    this.game.load.start();
  }

  private handleLoadProgress = (progress: number, key: string) => {
    this.loading.update(progress, key);
  }

  private handleLoadComplete = () => {
    this.loading.destroy();
    this.game.state.start('title');
  }
}
