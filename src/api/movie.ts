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

export interface IMovieListResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetNowPlayingResult extends IMovieListResult {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export const getNowPlaying = async (): Promise<IGetNowPlayingResult> => {
  return await Axios.get("/movie/now_playing").then((res) => res.data);
};

export const getTopRated = async (): Promise<IMovieListResult> => {
  return await Axios.get("/movie/top_rated").then((res) => res.data);
};

export const getPopular = async (): Promise<IMovieListResult> => {
  return await Axios.get("/movie/popular").then((res) => res.data);
};

export const getUpcoming = async (): Promise<IMovieListResult> => {
  return await Axios.get("/movie/upcoming").then((res) => res.data);
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
  release_date: string;
  runtime: number;
}

export const getDetails = async (movieId: number): Promise<IGetDetails> => {
  return await Axios.get(`/movie/${movieId}`).then((res) => res.data);
};

export interface ILogo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IGetImages {
  backdrops: [];
  id: number;
  logos: ILogo[];
  posters: [];
}

export const getImages = async (movieId: number): Promise<IGetImages> => {
  return await Axios.get(`/movie//${movieId}/images`, {
    params: { language: LOCALE },
  }).then((res) => res.data);
};

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface IGetCredits {
  id: string;
  cast: ICast[];
  crew: Array<{}>;
}

export const getCredits = async (movieId: number): Promise<IGetCredits> => {
  return await Axios.get(`/movie/${movieId}/credits`).then((res) => res.data);
};

export interface IKeyword {
  id: string;
  name: string;
}
export interface IGetKeywords {
  id: string;
  keywords: IKeyword[];
}

export const getKeywords = async (movieId: number): Promise<IGetKeywords> => {
  return await Axios.get(`/movie/${movieId}/keywords`).then((res) => res.data);
};
