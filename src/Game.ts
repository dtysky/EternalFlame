/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';

import {TResource, TGameRecords, TGameSetting} from './types';
import config from './config';

export default class Game extends Phaser.Game {
  public records: TGameRecords;
  public setting: TGameSetting;
  private layers;

  public init() {
    this.records = {
      duration: 0,
      fire: 0,
      water: 0,
      result: 'die'
    };

    this.setting = {
      flame: {
        lifeDuration: 10,
        maxVelocity: {
          x: 100,
          y: 100
        },
        initAcceleration: {
          x: 0,
          y: 100
        }
      },
      world: {
        worldWidth: 1200,
        worldHeight: 6000
      },
      mapElements: [
        {type: 'torch', x: 500, y: 5600, width: 100}
      ]
    };
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.forceOrientation(false, true);
  }
}
