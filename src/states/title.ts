/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';

export default class Title extends Phaser.State {
  public game: Game;
  private bg: Phaser.Sprite;
  private flame: Phaser.Sprite;
  private startButton: Phaser.Button;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public create() {
    console.log('title');
    this.game.stage.backgroundColor = '#000000';
    this.bg = this.game.add.sprite(0, 0, 'title-bg');

    this.flame = this.game.add.sprite(0, 0, 'flame');
    this.flame.scale.y = this.flame.scale.x = (this.game.width / 3) / this.flame.width;
    this.flame.anchor.setTo(.5, .5);
    this.flame.position.setTo(this.game.width / 2, this.game.height / 2 + 100);
    this.flame.animations.add('fire', ['1', '2', '3', '4', '5', '6'], 8, true);
    this.flame.animations.play('fire');

    this.startButton = this.add.button(0, 0, 'ui', this.handleStart, this, 'start', 'start');
    this.startButton.scale.x = this.startButton.scale.y = this.game.width * .6 / this.startButton.width;
    this.startButton.position.setTo(
      (this.game.width - this.startButton.width) / 2,
      this.game.height / 2
    );
  }

  public handleStart = () => {
    this.game.init();
    this.game.state.start('main');
  }
}
