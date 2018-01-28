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
import {TMapElement} from '../types';
import config from '../config';

function measureHeight(game: Game, type: TMapElement['type'], width: number) {
  switch (type) {
    case 'torch':
      return (new Torch(game, 0, 0, width)).height;
    case 'water':
      return (new Water(game, 0, 0, width)).height;
    case 'wall':
      return (new Wall(game, 0, 0, width)).height;
    default:
      return 0;
  }
}

export default class Main extends Phaser.State {
  public game: Game;
  private flame: Flame;
  private bg: Phaser.Sprite;
  private torches: Torch[] = [];
  private waters: Water[] = [];
  private walls: Wall[] = [];
  private cursors: Phaser.CursorKeys;
  private worldMask: Phaser.Graphics;
  private cameraMask: Phaser.Sprite;
  private worldFlameMask: Phaser.Graphics;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  public create() {
    console.log('main');
    this.bg = this.add.sprite(0, 0, 'bg');

    const {setting} = this.game;
    this.game.world.resize(setting.world.worldWidth, setting.world.worldHeight);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.cameraMask = this.game.add.sprite(0, 0, 'camera-mask');
    this.cameraMask.anchor.setTo(.5, .5);
    this.cameraMask.scale.x = this.cameraMask.scale.y = 900 / this.cameraMask.width;

    // for (let i = 0; i < 50; i++) {
      // this.torches.push(this.game.add.existing(new Torch(
      //   this.game,
      //   this.game.world.randomX,
      //   this.game.world.randomY,
      //   100
      // )));
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
    
    setting.mapElements.forEach(({type, x: sx, y: sy, width, xNum, yNum, key}) => {
      xNum = xNum || 1;
      yNum = yNum || 1;
      const height = measureHeight(this.game, type, width);

      for (let j = 0; j < yNum; j += 1) {
        const y = sy + j * height;
        for (let i = 0; i < xNum; i += 1) {
          const x = sx + i * width;
          switch (type) {
            case 'torch': {
              this.torches.push(this.game.add.existing(new Torch(this.game, x, y, width, key)));
              break;
            }
            case 'water': {
              this.waters.push(this.game.add.existing(new Water(this.game, x, y, width, key)));
              break;
            }
            case 'wall': {
              this.walls.push(this.game.add.existing(new Wall(this.game, x, y, width, key)));
              break;
            }
            default:
              break;
          }
        }
      }
    });

    this.flame = new Flame(this.game);
    this.flame.x = setting.flame.initPosition.x;
    this.flame.y = setting.flame.initPosition.y;

    this.game.add.existing(this.flame);
    this.camera.follow(this.flame, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
    this.flame.init();

    // this.worldFlameMask = this.game.add.graphics(200, 5600)
    //   .beginFill(0xffffff)
    //   .drawCircle(0, 0, 480)
    //   .endFill();
    this.worldMask = this.game.add.graphics(0, 0);
    this.worldMask
      .beginFill(0x000000)
      .drawRect(0, 0, setting.world.worldWidth, setting.world.worldHeight)
      .endFill();
    this.worldMask.endFill();
    this.world.mask = this.worldMask;
    // this.world.mask = this.worldFlameMask;
  }

  public update() {
    this.game.records.duration += this.time.elapsedMS;
    this.updateFlame();
    this.updateCollision();
    this.flame.selfWeak();
  }

  private updateFlame() {
    const {cursors, flame} = this;
    const {moveAcceleration, minVelocity} = this.game.setting.flame;
    const body = flame.body as Phaser.Physics.Arcade.Body;

    if (cursors.down.isDown) {
      body.acceleration.y = moveAcceleration;
    }

    if (cursors.up.isDown) {
      body.acceleration.y = -moveAcceleration;
    }

    if (cursors.right.isDown) {
      body.acceleration.x = moveAcceleration;
    }

    if (cursors.left.isDown) {
      body.acceleration.x = -moveAcceleration;
    }

    // if (body.velocity.y > -minVelocity.y) {
    //   body.velocity.y = -minVelocity.y;
    // }

    this.worldMask
      .clear()
      .beginFill(0xffffff)
      .drawCircle(flame.centerX, flame.centerY, 400)
      .endFill();

    // this.worldFlameMask.x = flame.centerX;
    // this.worldFlameMask.y = flame.centerY;
    this.cameraMask.x = flame.centerX;
    this.cameraMask.y = flame.centerY;
  }

  private updateCollision() {
    this.torches.forEach(torch => {
      this.game.physics.arcade.overlap(torch, this.flame);
      if (torch.inCamera && torch.state === 'alive') {
        this.worldMask
          .beginFill(0xffffff)
          .drawCircle(torch.centerX, torch.centerY, 240)
          .endFill();
      }
    });
    this.waters.forEach(water => {
      this.game.physics.arcade.overlap(water, this.flame);
    });
    this.walls.forEach(wall => {
      this.game.physics.arcade.collide(wall, this.flame);
    });
  }

  public render() {
    if (config.devMode) {
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
      this.game.debug.body(this.flame);
      this.torches.forEach(torch => {
        this.game.debug.body(torch);
      });
      this.waters.forEach(water => {
        this.game.debug.body(water);
      });
      this.walls.forEach(wall => {
        this.game.debug.body(wall);
      });
    }
  }

  public shutdown() {
    this.flame.kill();
    this.torches.forEach(torch => {
      torch.kill();
    });
  }
}
