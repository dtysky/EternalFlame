/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Jan 2018
 * Description:
 */
export type TResource = {
  key: string,
  url?: any,
  tUrl?: any,
  type: 'atlas' | 'image' | 'pack' | 'audio'
};

export type TResources = {
  loading: TResource[],
  main: TResource[]
};

export type TGameRecords = {
  duration: number,
  fire: number,
  water: number,
  result: 'die' | 'alive'
};

export type TMapElement = {
  type: 'torch' | 'water' | 'wall',
  x: number,
  y: number,
  width: number,
  xNum?: number,
  yNum?: number
};

export type TGameSetting = {
  flame: {
    lifeDuration: number,
    maxVelocity: {
      x: number,
      y: number
    },
    initAcceleration: {
      x: number,
      y: number
    }
  },
  world: {
    worldWidth: number,
    worldHeight: number
  },
  mapElements: TMapElement[]
};
