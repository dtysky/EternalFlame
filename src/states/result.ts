/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';

export default class Result extends Phaser.State {
  public game: Game;
  private bg: Phaser.Sprite;
  private button: Phaser.Button;
  private timeText: Phaser.BitmapText;
  private scoreText: Phaser.BitmapText;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public init() {
    
  }

  public create() {
    console.log('result');
    this.bg = this.game.add.sprite(0, 0, 'result');

    this.timeText = this.game.add.bitmapText(
      0, 0,
      'font',
      `${this.game.records.fire}`,
      32
    );
    this.timeText.position.setTo(220, 570);

    this.scoreText = this.game.add.bitmapText(
      0, 0,
      'font',
      (this.game.records.duration / 1000).toFixed(0),
      32
    );
    this.scoreText.position.setTo(220, 510);

    this.button = this.add.button(0, 0, null, this.handleRestart, this);
    this.button.width = this.game.width;
    this.button.height = this.game.height / 3;
    this.button.position.setTo(0, this.game.height - this.button.height);
  }

  private handleRestart = () => {
    this.game.state.start('title');
  }
}
