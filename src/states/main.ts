/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';
import Game from '../Game';
import Flame from '../components/Flame';
import Torch from '../components/Torch';
import Water from '../components/Water';

export default class Main extends Phaser.State {
  public game: Game;
  private flame: Flame;
  private torches: Torch[] = [];
  private waters: Water[] = [];
  private cursors: Phaser.CursorKeys;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public create() {
    console.log('main');
    this.game.world.resize(1200, 6000);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    // this.camera.position.setTo(this.game.world.centerX, this.game.world.centerY - 120);
    this.camera.x = 400;
    this.camera.y = 6000;

    for (let i = 0; i < 50; i++) {
      this.torches.push(this.game.add.existing(new Torch(
        this.game,
        this.game.world.randomX,
        this.game.world.randomY,
        100
      )));
      this.waters.push(this.game.add.existing(new Water(
        this.game,
        this.game.world.randomX,
        this.game.world.randomY,
        100
      )));
    }

    this.flame = new Flame(this.game);
    this.flame.fixedToCamera = true;
    this.flame.init();
    this.game.add.existing(this.flame);
  }

  public update() {
    this.updateCamera();
    this.torches.forEach(torch => {
      this.game.physics.arcade.overlap(torch, this.flame);
    });
    this.waters.forEach(torch => {
      this.game.physics.arcade.overlap(torch, this.flame);
    });
    this.flame.selfWeak();
  }

  private updateCamera() {
    const {cursors, camera} = this;

    if (cursors.left.isDown) {
      camera.x -= 4;
    }

    if (cursors.right.isDown) {
      camera.x += 4;
    }

    if (cursors.up.isDown) {
      camera.y -= 4;
    }

    if (cursors.down.isDown) {
      camera.y += 4;
    }
  }

  public render() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

  public shutdown() {
    // this.flame.destroy();
    // this.torches.forEach(torch => {
    //   torch.destroy();
    // });
  }
}
