/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';

export default class Loading {
  private game: Game;
  private flame: Phaser.Sprite;
  private bg: Phaser.Graphics;
  private progressBar: Phaser.Group;
  private barBg: Phaser.Graphics;
  private barFg: Phaser.Graphics;
  private text: Phaser.Text;

  constructor(game: Game) {
    this.game = game;

    this.flame = game.add.sprite(0, 0, 'flame');
    this.flame.scale.y = this.flame.scale.x = (game.width / 3) / this.flame.width;
    this.flame.anchor.setTo(.5, .5);
    this.flame.position.setTo(game.world.centerX, game.world.centerY - 120);
    this.flame.animations.add('fire', ['1', '2', '3', '4', '5', '6'], 10, true);
    this.flame.animations.play('fire');

    this.progressBar = game.add.group();

    this.barBg = game.add.graphics(0, 0, this.progressBar);
    this.barBg.beginFill(0xffffff);
    this.barBg.drawRoundedRect(0, 0, 200, 4, 2);
    this.barBg.endFill();

    this.progressBar.position.setTo(
      (game.width - this.progressBar.width) / 2,
      game.world.centerY
    );

    this.barFg = game.add.graphics(0, 0, this.progressBar);
    this.text = game.add.text(0, 0, '', {fill: '#00FF00', fontWeight: 200, fontSize: 20});
    this.text.anchor.setTo(.5, .5);
    this.text.position.setTo(game.world.centerX, game.world.centerY + 30);

    this.update(0, 'start');
  }

  public update(progress: number, key: string) {
    const percent = progress / 100;
    this.barFg.beginFill(0xffff00);
    this.barFg.drawRoundedRect(0, 0, percent * 200, 4, 2);
    this.barFg.endFill();
    this.text.text = `loading: ${key}...`;
  }

  public destroy() {
    this.flame.destroy();
    this.progressBar.destroy();
    this.barBg.destroy();
    this.barFg.destroy();
    this.text.destroy();
  }
}
