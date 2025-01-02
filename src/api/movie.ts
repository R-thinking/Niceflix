import Axios from "./base";
const LOCALE = "en";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface IGetNowPlayingResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getNowPlaying = async (): Promise<IGetNowPlayingResult> => {
  return await Axios.get("/movie/now_playing").then((res) => res.data);
};

export interface ITrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IGetTrailersResult {
  id: number;
  results: ITrailer[];
}

export const getTrailers = async (
  movieId: number
): Promise<IGetTrailersResult> => {
  return await Axios.get(`/movie/${movieId}/videos`).then((res) => res.data);
};

export interface IGenre {
  id: number;
  name: string;
}
export interface IGetDetails {
  homepage: string;
  genres: IGenre[];
}

export const getDetails = async (movieId: number): Promise<IGetDetails> => {
  return await Axios.get(`/movie/${movieId}`).then((res) => res.data);
};
