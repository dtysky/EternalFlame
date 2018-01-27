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
  private progressBar: Phaser.Group;
  private bar: Phaser.Sprite;
  private barMask: Phaser.Graphics;
  private text: Phaser.Text;

  constructor(game: Game) {
    this.game = game;
    this.game.stage.backgroundColor = '#000000';

    this.flame = game.add.sprite(0, 0, 'flame');
    this.flame.scale.y = this.flame.scale.x = (game.width / 2) / this.flame.width;
    this.flame.anchor.setTo(.5, .5);
    this.flame.position.setTo(game.world.centerX, game.world.centerY - 80);
    this.flame.animations.add('fire', ['1', '2', '3', '4', '5', '6'], 8, true);
    this.flame.animations.play('fire');

    this.progressBar = game.add.group();
    this.bar = game.add.sprite(0, 0, 'ui', 'loading', this.progressBar);
    this.bar.scale.x = this.bar.scale.y = this.game.width / 2 / this.bar.width;
    this.progressBar.position.setTo(
      (game.width - this.progressBar.width) / 2,
      game.world.centerY + 100
    );
    this.barMask = game.add.graphics(0, 0, this.progressBar);
    this.bar.mask = this.barMask;

    this.text = game.add.text(0, 0, '', {fill: '#ffaa00', fontWeight: 200, fontSize: 20});
    this.text.anchor.setTo(.5, .5);
    this.text.position.setTo(game.world.centerX, game.world.centerY + 180);

    this.update(0, 'start');
  }

  public update(progress: number, key: string) {
    const percent = progress / 100;
    this.barMask.beginFill(0xffffff);
    this.barMask.drawRect(0, 0, percent * this.bar.width, this.bar.height);
    this.barMask.endFill();
    this.text.text = `loading: ${key}...`;
  }

  public destroy() {
    this.flame.destroy();
    this.progressBar.destroy();
    this.barMask.destroy();
    this.bar.destroy();
    this.text.destroy();
  }
}
