import { create } from "zustand";
import { IGetDetails, IGetTrailersResult, IMovie } from "../api/movie";

type TPosition = string | number;

interface IPlayerState {
  isVisible: boolean;
  data: {
    movie: IMovie | null;
    trailer: IGetTrailersResult | null;
    details: IGetDetails | null;
  };

  position: {
    left: TPosition;
    top: TPosition;
  };
  setVisibility: (visibility: boolean) => void;
  setData: (
    movie: IMovie,
    trailer: IGetTrailersResult,
    details: IGetDetails
  ) => void;
  setPosition: (left: TPosition, top: TPosition) => void;
}

export const playerStore = create<IPlayerState>()((set, get) => ({
  isVisible: false,
  data: {
    movie: null,
    trailer: null,
    details: null,
  },
  position: {
    left: "",
    top: "",
  },
  setData: (movie, trailer, details) =>
    set({ data: { movie, trailer, details } }),
  setVisibility: (visibility: boolean) => set({ isVisible: visibility }),
  setPosition: (left, top) => set({ position: { left, top } }),
}));
