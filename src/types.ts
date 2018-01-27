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

export type TVars = {
  config: {
    flame: {
      lifeDuration: number
    }
  },
  records: {
    duration: number,
    fire: number,
    water: number,
    result: 'die' | 'alive'
  }
};
