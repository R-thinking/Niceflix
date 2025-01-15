export declare global {
  type Timer = ReturnType<typeof setTimeout> | null | number;
  type soundState = "MUTE" | "UNMUTE";
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
