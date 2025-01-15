import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IGlabalState {
  goldenRatio: number;
  offset: number;
  itemGap: number;
  commonPaddingPercent: number;
  isLogin: boolean;
  getCommonPadding: () => number;
  getSlideWidth: () => number;
  partialNextSlideWidth: number;
  getItemWidth: () => number;
  getMovingWidth: () => number;
  getItemHeight: () => number;
  setLogin: () => void;
}

export const globalStore = create<IGlabalState>()(
  persist(
    (set, get) => ({
      goldenRatio: 1.61803398,
      offset: 6,
      itemGap: 10,
      partialNextSlideWidth: 30,
      commonPaddingPercent: 2.5,
      isLogin: false,
      getCommonPadding: () =>
        (window.outerWidth * get().commonPaddingPercent) / 100,
      getSlideWidth: () =>
        (window.outerWidth * (100 - 2 * get().commonPaddingPercent)) / 100,
      getItemWidth: () =>
        (get().getSlideWidth() -
          get().itemGap * get().offset -
          get().partialNextSlideWidth) /
        get().offset,
      getMovingWidth: () =>
        get().offset * (get().getItemWidth() + get().itemGap),
      getItemHeight: () => get().getItemWidth() / get().goldenRatio,
      setLogin: () => {
        set({ isLogin: true });
      },
    }),
    {
      name: "global-storage", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
