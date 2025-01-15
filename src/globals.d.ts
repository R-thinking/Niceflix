export declare global {
  type TTimer = ReturnType<typeof setTimeout> | null | number;
  type TSoundState = "MUTE" | "UNMUTE";
  type TVideo = "MOVIE" | "SHOWS";
  type TMovieList = "NOW_PLAYING" | "TOR_RATED" | "POPULAR" | "UPCOMING";
  interface IYoutubePlayer {
    playVideo: () => Promise<void>;
    pauseVideo: () => Promise<void>;
    stopVideo: () => Promise<void>;
    mute: () => Promise<void>;
    unMute: () => Promise<void>;
    seekTo: (time: number) => Promise<void>;
    getDuration: () => Promise<number>;
    setSize: (width: number, height: number) => Promise<void>;
  }
}
