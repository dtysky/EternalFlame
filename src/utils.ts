/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 27 Jan 2018
 * Description:
 */
import {TResource} from './types';
import Game from './Game';

export function loadAssets(game: Game, resources: TResource[]) {
  resources.forEach(({type, key, url, tUrl}) => {
    switch (type) {
      case 'pack':
        game.load.pack(key, url);
        break;
      case 'image':
        game.load.image(key, url);
        break;
      case 'atlas':
        game.load.atlas(key, url, tUrl);
        break;
      case 'audio':
        game.load.audio(key, url);
        break;
      default:
        break;
    }
  });
};
