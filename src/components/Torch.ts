/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 27 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import Flame from './Flame';
import config from '../config';

export default class Torch extends Phaser.Sprite {
  public game: Game;
  public state: 'die' | 'alive';
  private flame: Phaser.Sprite;
  private flameType: string;

  constructor(game: Game, x: number, y: number, width: number, key: string = 'torch') {
    super(game, x, y, key);
    this.state = 'die';
    this.flameType = key;

    this.flame = new Phaser.Sprite(this.game, 0, 0, 'torch-flame');
    if (key === 'torch') {
      this.flame.scale.x = 1.5;
      this.flame.scale.y = 2;
      this.flame.position.setTo(0, -220);
    } else {
      this.flame.scale.x = 1.8;
      this.flame.scale.y = 2.2;
      this.flame.position.setTo(0, -240);
    }
    this.flame.visible = false;
    this.addChild(this.flame);
    this.flame.animations.add('fire', ['1', '2', '3', '4', '5', '6'], 6, true);

    this.game.physics.arcade.enable([this]);
    const body = this.body as Phaser.Physics.Arcade.Body;

    body.collideWorldBounds = true;
    body.bounce.set(1);
    body.setSize(this.width * 2 / 3, this.height / 2, this.width / 6);
    body.allowGravity = false;

    this.scale.x = this.scale.y = width / this.width;

    body.onOverlap = new Phaser.Signal();
    body.onOverlap.add(this.onFire);
  }

  public onFire = (self: Torch, target: Flame) => {
    target.enhance();

    if (this.state === 'die') {
      config.devMode && console.log('torch');
      this.state = 'alive';
      this.game.records.fire += 1;
      this.flame.animations.play('fire');
      this.flame.visible = true;
      // this.body.onOverlap.remove(this.onFire);

      if (this.flameType === 'cross') {
        setTimeout(
          () => this.game.state.start('result'),
          1000
        );
      }
    }
  }
}
