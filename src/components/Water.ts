/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 27 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import Flame from './Flame';

export default class Water extends Phaser.Sprite {
  public game: Game;

  constructor(game: Game, x: number, y: number, width: number) {
    super(game, x, y, 'water');
    this.scale.x = this.scale.y = width / this.width;

    this.animations.add('flow', ['1', '2', '3', '4', '5', '6'], 6, true);
    this.animations.play('flow');

    this.game.physics.arcade.enable([this]);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.allowGravity = false;

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onFire);
  }

  public onFire = (self: Water, target: Flame) => {
    target.weak(50);
    console.log('water');
  }
}
