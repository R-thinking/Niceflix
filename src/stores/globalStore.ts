import { create } from "zustand";

interface IGlabalState {
  goldenRatio: number;
  offset: number;
  itemGap: number;
  commonPaddingPercent: number;
  getCommonPadding: () => number;
  getSlideWidth: () => number;
  partialNextSlideWidth: number;
  getItemWidth: () => number;
  getMovingWidth: () => number;
  getItemHeight: () => number;
}

export const globalStore = create<IGlabalState>()((set, get) => ({
  goldenRatio: 1.61803398,
  offset: 6,
  itemGap: 10,
  partialNextSlideWidth: 30,
  commonPaddingPercent: 2.5,
  getCommonPadding: () =>
    (window.outerWidth * get().commonPaddingPercent) / 100,
  getSlideWidth: () =>
    (window.outerWidth * (100 - 2 * get().commonPaddingPercent)) / 100,
  getItemWidth: () =>
    (get().getSlideWidth() -
      get().itemGap * get().offset -
      get().partialNextSlideWidth) /
    get().offset,
  getMovingWidth: () => get().offset * (get().getItemWidth() + get().itemGap),
  getItemHeight: () => get().getItemWidth() / get().goldenRatio,
}));
