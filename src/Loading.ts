/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import * as Phaser from 'phaser-ce';

export default class Loading extends Phaser.Group {
  private bg: Phaser.Sprite;
  private progressBar: Phaser.Group;
  private barBg: Phaser.Graphics;
  private barFg: Phaser.Graphics;
  private text: Phaser.Text;
}
