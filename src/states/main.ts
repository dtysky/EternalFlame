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
import Wall from '../components/Wall';

export default class Main extends Phaser.State {
  public game: Game;
  private flame: Flame;
  private torches: Torch[] = [];
  private waters: Water[] = [];
  private walls: Wall[] = [];
  private cursors: Phaser.CursorKeys;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public create() {
    console.log('main');
    const {setting} = this.game;
    this.game.world.resize(setting.world.worldWidth, setting.world.worldHeight);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  
    // for (let i = 0; i < 50; i++) {
    //   this.torches.push(this.game.add.existing(new Torch(
    //     this.game,
    //     this.game.world.randomX,
    //     this.game.world.randomY,
    //     100
    //   )));
      // this.waters.push(this.game.add.existing(new Water(
      //   this.game,
      //   this.game.world.randomX,
      //   this.game.world.randomY,
      //   100
      // )));
      // this.walls.push(this.game.add.existing(new Wall(
      //   this.game,
      //   this.game.world.randomX,
      //   this.game.world.randomY,
      //   100
      // )));
    // }
    setting.mapElements.forEach(({type, x, y, width}) => {
      switch (type) {
        case 'torch':
          this.torches.push(this.game.add.existing(new Torch(this.game, x, y, width)));
          break;
        case 'water':
          this.torches.push(this.game.add.existing(new Water(this.game, x, y, width)));
          break;
        case 'wall':
          this.torches.push(this.game.add.existing(new Wall(this.game, x, y, width)));
          break;
        default:
          break;
      }
    });

    this.flame = new Flame(this.game);
    this.flame.x = 400;
    this.flame.y = 6000;

    this.game.add.existing(this.flame);
    this.camera.follow(this.flame);
    this.flame.init();
  }

  public update() {
    this.updateFlame();
    this.updateCollision();
    this.flame.selfWeak();
  }

  private updateFlame() {
    const {cursors, flame} = this;
    const body = flame.body as Phaser.Physics.Arcade.Body;

    if (cursors.down.isDown) {
      body.acceleration.y = 100;
      // this.game.physics.arcade.accelerationFromRotation(Math.PI / 2, 300, flame.body.acceleration);
    }

    if (cursors.up.isDown) {
      body.acceleration.y = -100;
      // this.game.physics.arcade.accelerationFromRotation(Math.PI * 3 / 2, 300, flame.body.acceleration);
    }

    if (cursors.right.isDown) {
      body.acceleration.x = 100;
      // this.game.physics.arcade.accelerationFromRotation(0, 300, flame.body.acceleration);
    }

    if (cursors.left.isDown) {
      body.acceleration.x = -100;
      // this.game.physics.arcade.accelerationFromRotation(Math.PI, 300, flame.body.acceleration);
    }

    if (body.velocity.y > 0) {
      body.velocity.y = 0;
    }
  }

  private updateCollision() {
    this.torches.forEach(torch => {
      this.game.physics.arcade.overlap(torch, this.flame);
    });
    this.waters.forEach(water => {
      this.game.physics.arcade.overlap(water, this.flame);
    });
    this.walls.forEach(wall => {
      this.game.physics.arcade.collide(wall, this.flame);
    });
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
