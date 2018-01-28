/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import {TResources, TMapElement} from './types';

declare const globalEnv: {
  NODE_ENV: string
};
const env = globalEnv.NODE_ENV;
const devMode = env === 'development';

export default {
  env,
  devMode,
  assetsBasePath: '/assets/',
  width: 540,
  height: 960
};

export const resources: TResources = {
  loading: [
    {type: 'atlas', key: 'flame', url: 'flame.png', tUrl: 'flame.json'},
    {type: 'atlas', key: 'ui', url: 'ui.png', tUrl: 'ui.json'}
  ],
  main: [
    {type: 'image', key: 'title-bg', url: 'title-bg.jpg'},
    {type: 'image', key: 'result', url: 'result.png'},
    {type: 'bitmapFont', key: 'font', url: 'font.png', tUrl: 'font.xml'},
    {type: 'image', key: 'camera-mask', url: 'camera-mask.png'},
    {type: 'image', key: 'bg', url: 'bg.jpg'},
    {type: 'image', key: 'torch', url: 'torch.png'},
    {type: 'image', key: 'cross', url: 'cross.png'},
    {type: 'atlas', key: 'water', url: 'water.png', tUrl: 'water.json'},
    {type: 'image', key: 'wall', url: 'wall.png'},
    {type: 'atlas', key: 'torch-flame', url: 'torch-flame.png', tUrl: 'torch-flame.json'}
  ]
};
