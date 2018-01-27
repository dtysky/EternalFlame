/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
import {TResources, TMapElement} from './types';

export default {
  assetsBasePath: '/assets/',
  width: 540,
  height: 960
};

export const resources: TResources = {
  loading: [
    {type: 'atlas', key: 'flame', url: 'flame.png', tUrl: 'flame.json'}
  ],
  main: [
    {type: 'image', key: 'start-game', url: 'start-game.png'},
    {type: 'image', key: 'torch', url: 'torch.png'},
    {type: 'image', key: 'water', url: 'water.png'},
    {type: 'image', key: 'wall', url: 'wall.png'}
  ]
};
