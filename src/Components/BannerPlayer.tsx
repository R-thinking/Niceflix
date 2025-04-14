import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { styled } from "styled-components";
import { getDetails, getImages, getTrailers, IMovie } from "../api/movie";
import { createImagePath } from "../utilities/image";
import { useQuery } from "react-query";
import { isAxiosError } from "axios";
import { getDuration } from "../api/youtube";
import PlayIcon from "../asets/PlayIcon";
import InfoIcon from "../asets/InfoIcon";
import { globalStore } from "../stores";
import Slider from "./Slider";

const Banner = styled(motion.div)<{ backdroppath: string }>`
  height: 100vh;
  position: relative;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(83, 83, 83, 0.3),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.backdroppath});
  background-size: cover;
`;

const MovingListener = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
`;

interface IDescriptionLayer {
  $leftCommonPadding: number;
  $slideItemHeight: number;
}
const DescriptionLayer = styled(motion.div)<IDescriptionLayer>`
  position: absolute;
  left: ${(props) => `${props.$leftCommonPadding}px`};
  bottom: ${(props) => `${props.$slideItemHeight}px`};
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 2;
  margin-bottom: 100px;
`;

const MovieTitleBox = styled.div<{ $hasmovieLogo: boolean | undefined }>`
  width: ${(props) => (props.$hasmovieLogo ? "40%" : "70%")};
  height: ${(props) => (props.$hasmovieLogo ? "25vh" : "15vh")};
`;
const MovieLogo = styled.div<{ $backdropPath: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$backdropPath});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.div`
  font-size: 60px;
  font-weight: 700;
  width: 70%;
`;

const Overview = styled.p`
  font-size: 17px;
  width: 40%;
  margin-bottom: 15px;
`;

const NowPlaying = styled.div`
  width: 100%;
  position: absolute;
  bottom: 30px;
  z-index: 2;
`;

const SliedeTitle = styled.div<{ $leftCommonPadding: number }>`
  font-size: 18px;
  font-weight: 600;
  padding-left: ${(props) => `${props.$leftCommonPadding}px`};
  margin-bottom: 5px;
`;

const Controller = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  button,
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 42px;
    font-size: 16px;
    font-weight: 550;
    border-radius: 4px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

const ControlButton = styled(motion.button)`
  width: 139px;
  background-color: white;
  color: black;
`;

const InformationButton = styled(motion.a)`
  width: 161px;
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
`;

const Player = styled(motion.div)`
  position: absolute;
  top: 0;
  pointer-events: none;
  width: 100%;
  height: 100vh;
`;

const playerVariants = {
  inactive: { zIndex: -1, opacity: 0 },
  active: { zIndex: 1, opacity: 1, transition: { duration: 1.5 } },
};

interface IBannerProps {
  playerWidth: string;
  playerHeight: string;
}

const BannerPlayer: React.FC<{
  movie: IMovie;
  bannerProps?: IBannerProps;
  slideItems: IMovie[];
}> = ({ movie, bannerProps, slideItems }) => {
  const {
    data: trailerData,
    error,
    isError,
  } = useQuery(["trailer"], () => getTrailers(movie.id));
  if (isError) {
    if (isAxiosError(error)) {
    }
  }

  const { data: durationData } = useQuery(
    ["duration", trailerData],
    () => getDuration(trailerData?.results[0].key ?? ""),
    { enabled: !!trailerData }
  );

  const { data: movieImages } = useQuery(
    ["logo", movie?.id],
    () => {
      if (movie) return getImages(movie.id);
    },
    {
      enabled: !!movie,
    }
  );

  let logoUrl = "";
  const hasMovieLogo = movieImages && movieImages?.logos.length > 0;
  if (hasMovieLogo) {
    logoUrl = createImagePath(movieImages?.logos[0].file_path);
  }

  const { data: detailData } = useQuery(["details"], () =>
    getDetails(movie.id)
  );

  const leftCommonPadding = globalStore((state) => state.getCommonPadding());
  const slideItemHeight = globalStore((state) => state.getItemHeight());

  const startTime = durationData && durationData > 30 ? durationData - 30 : 0;

  const youtubeRef = useRef<YouTube>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [playerHeight, setPlayerHeight] = useState<string | number>(
    window.innerHeight
  );
  useEffect(() => setPlayerHeight(window.innerHeight), [window.innerHeight]);

  const [playTimer, setPlayTimer] = useState<TTimer>(null);
  const [backgroundTimer, setBackgroundTimer] = useState<TTimer>(null);
  const [hideTimer, setHideTimer] = useState<TTimer>(null);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  const renewIsMouseMoving = () => {
    setIsMouseMoving(true);
    if (typeof hideTimer === "number") {
      clearTimeout(hideTimer);
    }
    setHideTimer(setTimeout(() => setIsMouseMoving(false), 1200));
  };

  /* const hideController = () => {
    setTimeout(() => setIsMouseMoving(false), 500);
  }; */

  const playInterval = 10000; //30000
  const playTime = 30000;

  const getPlayTimer = () => {
    const timer = setTimeout(async () => {
      if (durationData) {
        setEndTimer(
          setTimeout(
            async () => await stopPlayer(),
            durationData > 30 ? playTime - 1000 : durationData * 1000 - 1000
          )
        );
      }
      const player = youtubeRef?.current?.getInternalPlayer();
      if (player && (await player.isMuted())) await player.unMute();
      await player?.seekTo(startTime);
      await player?.playVideo();

      setTimeout(() => {
        setIsReady(true);
      }, 500);
    }, playInterval);
    return timer;
  };

  const clearEndTimer = () => {
    if (typeof endTimer === "number") {
      clearTimeout(endTimer);
    }
  };

  const clearPlayTimer = () => {
    if (typeof playTimer === "number") {
      clearTimeout(playTimer);
    }
  };
  const resetTimer = async () => {
    if (typeof playTimer === "number") {
      clearTimeout(playTimer);
    }

    if (isReady) return;

    const timer = getPlayTimer();
    setPlayTimer(timer);
  };

  const [endTimer, setEndTimer] = useState<TTimer>(null);
  const onEndPlayer = () => {
    clearPlayTimer();

    setIsReady(false);

    const timer = getPlayTimer();
    setPlayTimer(timer);
  };

  const onReadyPlayer = async () => {
    clearPlayTimer();

    if (isReady) return;
    if (isMouseMoving) {
      setTimeout(() => onReadyPlayer(), 3000);
      return;
    }

    const player = youtubeRef.current?.getInternalPlayer();

    /* play background for a moment to remove title & logo */
    await player.mute();
    await player.playVideo();
    setBackgroundTimer(
      setTimeout(async () => {
        await player.pauseVideo();
      }, 4000)
    );

    const timer = setTimeout(async () => {
      if (durationData) {
        setEndTimer(
          setTimeout(
            async () => await stopPlayer(),
            durationData > 30 ? playTime - 1000 : durationData * 1000 - 1000
          )
        );
      }
      await player?.seekTo(startTime);
      await player?.playVideo();
      setTimeout(async () => {
        await player.unMute();
        setIsReady(true);
      }, 5000);
    }, playInterval);

    setPlayTimer(timer);
  };

  const stopPlayer = async () => {
    clearPlayTimer();
    clearEndTimer();

    onEndPlayer();
    await youtubeRef?.current?.getInternalPlayer().pauseVideo();
  };

  /* const clearBackgroundTimer = () => {
    if (typeof backgroundTimer === "number") {
      clearTimeout(backgroundTimer);
    }
  }; */
  /* const playPlayer = async () => {
    clearPlayTimer();
    clearBackgroundTimer();
    if (isReady) return;

    const player = youtubeRef?.current?.getInternalPlayer();
    setTimeout(async () => {
      if (player && (await player.isMuted())) await player.unMute();
      await player.seekTo(startTime);
      await player.playVideo();
      setIsReady(true);
    }, 500);

    hideController();
  }; */

  return (
    <Banner
      backdroppath={createImagePath(movie.backdrop_path ?? "")}
      onMouseMove={resetTimer}
    >
      <MovingListener
        style={{ display: isReady ? "block" : "none" }}
        onMouseMove={renewIsMouseMoving}
      ></MovingListener>
      <DescriptionLayer
        $leftCommonPadding={leftCommonPadding}
        $slideItemHeight={slideItemHeight}
      >
        {movieImages && (
          <MovieTitleBox $hasmovieLogo={hasMovieLogo}>
            {hasMovieLogo ? (
              <MovieLogo $backdropPath={logoUrl} />
            ) : (
              <Title>{movie.title}</Title>
            )}
          </MovieTitleBox>
        )}
        <Overview>{movie.overview}</Overview>
        <Controller>
          {
            <ControlButton
              whileHover={{
                backgroundColor: "#b1b1b1",
              }}
              onClick={() => {}}
            >
              <PlayIcon iconwidth="21px" /> Play
            </ControlButton>
          }
          <InformationButton
            whileHover={{
              backgroundColor: "#393939",
            }}
            href={detailData?.homepage}
            target="_blank"
          >
            <InfoIcon iconwidth="26px" />
            More Info
          </InformationButton>
        </Controller>
      </DescriptionLayer>
      <NowPlaying>
        <SliedeTitle $leftCommonPadding={leftCommonPadding}>
          Now Playing
        </SliedeTitle>
        <Slider sliderID="nowPlaying" videoType="MOVIE" items={slideItems} />
      </NowPlaying>

      <Player
        ref={playerRef}
        variants={playerVariants}
        initial="inactive"
        animate={isReady ? "active" : "inactive"}
      >
        {trailerData && (
          <YouTube
            ref={youtubeRef}
            videoId={trailerData.results[0].key}
            opts={{
              width: bannerProps?.playerWidth ?? "100%",
              height: playerHeight,
              playerVars: {
                controls: 0, //disable control of users
                disablekb: 0, //disable keyboard
                rel: 0, // hide recomended videos
              },
            }}
            onReady={onReadyPlayer}
            // onEnd={onEndPlayer}
          />
        )}
      </Player>
    </Banner>
  );
};

export default BannerPlayer;
