/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 27 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import Flame from './Flame';

export default class Wall extends Phaser.Sprite {
  public game: Game;

  constructor(game: Game, x: number, y: number, width: number) {
    super(game, x, y, 'wall');
    this.scale.x = this.scale.y = width / this.width;

    this.game.physics.arcade.enable([this]);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.allowGravity = false;

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.onFire);
    this.body.immovable = true;
  }

  public onFire = (self: Wall, target: Flame) => {
    // target.weak(50);
    console.log('wall');
  }
}
