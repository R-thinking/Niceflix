import { create } from "zustand";

interface ISlide {
  slideIndex: number;
}

interface ISliderState {
  slidesInfo: {
    [id: string]: ISlide;
  };
  setSlidesInfo: (id: string, slide: ISlide) => void;
}

export const sliderStore = create<ISliderState>()((set, get) => ({
  slidesInfo: {},
  setSlidesInfo: (id, slide) => {
    set((state) => ({ slidesInfo: { ...state.slidesInfo, [id]: slide } }));
  },
}));
