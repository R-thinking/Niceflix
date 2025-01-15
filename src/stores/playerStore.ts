import { create } from "zustand";
import { IGetDetails, IGetTrailersResult, IMovie } from "../api/movie";

type TPosition = string | number;
type TMovieImages = {
  backdropImage: string;
  logoImage: string;
};

interface IPlayerState {
  isVisible: boolean;
  data: {
    movie: IMovie | null;
    trailer: IGetTrailersResult | null;
    details: IGetDetails | null;
    images: TMovieImages;
  };

  position: {
    left: TPosition;
    top: TPosition;
  };
  setVisibility: (visibility: boolean) => void;
  setData: (
    movie: IMovie,
    trailer: IGetTrailersResult,
    details: IGetDetails,
    images: TMovieImages
  ) => void;
  setPosition: (left: TPosition, top: TPosition) => void;
}

export const playerStore = create<IPlayerState>()((set, get) => ({
  isVisible: false,

  data: {
    movie: null,
    trailer: null,
    details: null,
    images: {
      backdropImage: "",
      logoImage: "",
    },
  },
  position: {
    left: "",
    top: "",
  },
  setData: (movie, trailer, details, images) =>
    set({ data: { movie, trailer, details, images } }),
  setVisibility: (visibility: boolean) => set({ isVisible: visibility }),
  setPosition: (left, top) => set({ position: { left, top } }),
}));
