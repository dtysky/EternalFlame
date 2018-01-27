/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';

import {TResource, TVars} from './types';
import config from './config';

export default class Game extends Phaser.Game {
  public vars: TVars;
  private layers;

  public init() {
    this.vars = {
      records: {
        duration: 0,
        fire: 0,
        water: 0,
        result: 'die'
      },
      config: {
        flame: {
          lifeDuration: 10
        }
      }
    };
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.forceOrientation(false, true);
  }
}
