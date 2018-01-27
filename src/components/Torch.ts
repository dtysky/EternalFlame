/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 27 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import Flame from './Flame';

export default class Torch extends Phaser.Sprite {
  public game: Game;
  public state: 'die' | 'alive';

  constructor(game: Game, x: number, y: number, width: number) {
    super(game, x, y, 'torch');
    this.state = 'die';
    this.scale.x = this.scale.y = width / this.width;

    this.game.physics.arcade.enable([this]);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.allowGravity = false;

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onFire);
  }

  public onFire = (self: Torch, target: Flame) => {
    if (this.state === 'die') {
      this.state = 'alive';
      target.enhance();
      this.body.onOverlap.remove(this.onFire);
    }
    console.log('haha', self, target);
  }
}
