/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import config from '../config';

export default class Flame extends Phaser.Sprite {
  public game: Game;
  public life: number;
  private elapsedMS: number;
  private originScale: number;
  private invincible: boolean;

  constructor(game: Game) {
    super(game, 0, 0, 'flame');
    this.life = 100;
    this.invincible = false;

    this.animations.add('fire', ['1', '2', '3', '4', '5', '6'], 10, true);
    this.animations.play('fire');

    this.game.physics.arcade.enable([this]);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.collideWorldBounds = true;
    body.bounce.set(1);
    body.allowGravity = false;
    body.maxVelocity.x = game.setting.flame.maxVelocity.x;
    body.maxVelocity.y = game.setting.flame.maxVelocity.y;
    body.acceleration.x = game.setting.flame.initAcceleration.x;
    body.acceleration.y = game.setting.flame.initAcceleration.y;
  }

  public init() {
    this.originScale = this.scale.x = this.scale.y = 100 / this.width;
    // this.cameraOffset.setTo(250, this.game.height - 400);
    this.elapsedMS = 0;
  }

  public enhance() {
    config.devMode && console.log('enhance');
    this.life = 100;
    this.scale.x = this.scale.y = this.originScale;

    // this.game.add.tween(this.scale.x)
    //   .to(this.originScale, 100, 'Linear', true)
    //   .onUpdateCallback((tw, value) => {
    //     console.log(value);
    //     this.scale.x = this.scale.y = value;
    //   });
  }

  public weak(damage: number, cd: boolean = true) {
    if (this.invincible) {
      return;
    }

    const life = this.life - damage;

    this.life = life < 0 ? 0 : life;
    this.scale.x = this.scale.y = this.originScale * life / 100;

    if (this.life === 0) {
      this.die();
    }

    if (cd) {
      this.invincible = true;
      setTimeout(
        () => {
          this.invincible = false;
        },
        1000
      );
    }
  }

  public selfWeak() {
    this.elapsedMS += this.game.time.elapsedMS;
    if (this.elapsedMS < 300) {
      return;
    }
    const percent = this.elapsedMS / 1000 / this.game.setting.flame.lifeDuration;
    this.elapsedMS = 0;
    this.weak(percent * 100, false);
  }

  public die() {
    this.game.state.start('result');
  }
}
