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

export type TResources = TResource[][];

export type TVars = {
  
};
