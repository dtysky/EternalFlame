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
    this.vars = {};
  }

  public addChild() {

  }

  public removeChild() {

  }

  public showLoading() {

  }

  public hideLoading() {

  }
}
