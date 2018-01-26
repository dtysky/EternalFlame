/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';

class SimpleGame {
  private game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
      preload: this.preload,
      create: this.create
    });
  }

  private preload() {
    this.game.load.image('logo', '/assets/o.png');
  }

  private create() {
    const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');

    logo.anchor.setTo(0.5, 0.5);
  }

}

window.onload = () => {
  const game = new SimpleGame();
};
