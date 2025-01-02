import { styled } from "styled-components";
import { getDetails, getTrailers, IMovie } from "../api/movie";
import { motion } from "framer-motion";
import { createImagePath } from "../utilities/image";
import "@fontsource/bebas-neue";
import { NetflixSmallLogo } from "../asets/NetflixSmallLogo";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import DotIcon from "../asets/DotIcon";
import PlayIcon from "../asets/PlayIcon";
import AddIcon from "../asets/AddIcon";
import ThumbsUpIcon from "../asets/ThumbsUpIcon";
import DownArrowIcon from "../asets/DownArrowIcon";
import { isAxiosError } from "axios";
import YouTube from "react-youtube";
import { globalStore, playerStore, sliderStore } from "../stores";
import MuteIcon from "../asets/MuteIcon";
import UnMuteIcon from "../asets/UnMuteIcon";

const Button = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Frame = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Thumbnail = styled(motion.div)<{
  $backdropPath: string;
  $activePlayer: boolean;
}>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$backdropPath});
  background-size: cover;
  cursor: ${(props) => (props.$activePlayer ? "auto" : "pointer")};
  position: relative;
  border: none;
`;

const LogoBox = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
`;

const Title = styled.div`
  font-family: "Bebas Neue", sans-serif;
  font-size: 25px;
  color: rgb(255, 255, 255);
  font-weight: 500;
  position: absolute;
  left: 5px;
  bottom: 5px;
`;

const Player = styled(motion.div)`
  position: absolute;
  top: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

const playerVariants = {
  inactive: { zIndex: -1, opacity: 0 },
  active: { zIndex: 2, opacity: 1, transition: { duration: 1.5 } },
};

const Controller = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  div {
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
const controllerVariants = {
  inactive: { zIndex: -1, opacity: 0 },
  active: { zIndex: 2, opacity: 1, transition: { duration: 1.5 } },
};

const MuteButton = styled(Button)``;
const UnMuteButton = styled(Button)``;

const DescriptionLayer = styled(motion.div)`
  width: 100%;
  height: 90px;
  background-color: rgb(20, 20, 20);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  padding: 10px;
  position: relative;
  color: rgb(188, 188, 188);
  border: 0.5px solid rgb(20, 20, 20);
`;

const Menu = styled.div`
  display: flex;
  gap: 5px;
  height: 20px;
`;

const PlayButton = styled(Button)`
  padding-left: 1px;
  background-color: white;
`;

const AddButton = styled(Button)`
  background-color: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const LikeButton = styled(Button)`
  background-color: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const MoreButton = styled(Button)`
  background-color: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 10px;
  top: 10px;
`;

const PreviewDetails = styled.div`
  display: flex;
  align-items: end;
  gap: 5px;
`;

const PreviewGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 9px;
  gap: 2px;
`;

interface IThumbnailPlayerProps {
  item: IMovie;
  isFirstOneOfSlide: Boolean;
  itemIndex: number;
  sliderID: string;
  methodProps: { showNextSlides: () => void; showPrevSlides: () => void };
}

const ThumbnailPlayer = ({
  sliderID,
  item,
  isFirstOneOfSlide,
  itemIndex,
  methodProps,
}: IThumbnailPlayerProps) => {
  const {
    data: trailerData,
    error,
    isError,
  } = useQuery(["trailer", item.id], () => getTrailers(item.id));
  if (isError) {
    if (isAxiosError(error)) console.error("failed", error.message);
  }
  const slidesInfo = sliderStore((state) => state.slidesInfo);

  const { data: detailsData, isLoading } = useQuery(["details", item.id], () =>
    getDetails(item.id)
  );

  interface player {
    playVideo: () => Promise<void>;
    pauseVideo: () => Promise<void>;
    stopVideo: () => Promise<void>;
    mute: () => Promise<void>;
    unMute: () => Promise<void>;
    seekTo: (time: number) => Promise<void>;
    getDuration: () => Promise<number>;
  }

  const itemHeight = globalStore((state) => state.getItemHeight());
  const youtubeRef = useRef<YouTube>(null);
  const [isPlayingViedeo, setIsPlayingVideo] = useState(false);
  const [activePlayer, setActivePreview] = useState(false);
  const [playTimer, setPlayTimer] = useState<Timer>(null);
  const [loopTimer, setLoopTimer] = useState<Timer>(null);

  const playLoop = async (player: player, duration: number) => {
    setLoopTimer(
      setTimeout(async () => {
        await player.seekTo(0);
        await playLoop(player, duration);
      }, duration * 1000 - 1000)
    );
  };
  const clearAllTimer = () => {
    if (typeof loopTimer === "number") {
      clearTimeout(loopTimer);
    }
    if (typeof playTimer === "number") {
      clearTimeout(playTimer);
    }
  };

  const onReadyPlayer = async () => {
    const player: player = await youtubeRef.current?.getInternalPlayer();
    const duration = await player.getDuration();
    if (player) {
      await player.mute();
      await player.playVideo();
      setPlayTimer(
        setTimeout(async () => {
          setIsPlayingVideo(true);
        }, 3500)
      );
      await playLoop(player, duration);
    }
  };

  const onClickPreview = () => {
    setIsPlayingVideo(true);
  };

  const offset = 6;

  const onClickThumbnail = async () => {
    const slideIndex = slidesInfo[sliderID].slideIndex;
    const isNextOneOfSlide = itemIndex - (slideIndex + 1) * offset === 0;
    const isPreviousOneOfSlide = itemIndex + 1 === slideIndex * offset;
    if (isNextOneOfSlide) return methodProps.showNextSlides();
    if (isPreviousOneOfSlide) return methodProps.showPrevSlides();
    setSound("MUTE");
    setActivePreview(true);
    // await onReadyPlayer();
  };
  const onMouseLeave = () => {
    clearAllTimer();
    setActivePreview(false);
    setIsPlayingVideo(false);
  };

  type soundState = "MUTE" | "UNMUTE";
  const [sound, setSound] = useState<soundState>("MUTE");
  const onUnMute = async () => {
    const player: player = await youtubeRef.current?.getInternalPlayer();
    if (player) {
      await player.unMute();
      setSound("UNMUTE");
    }
  };
  const onMute = async () => {
    const player: player = await youtubeRef.current?.getInternalPlayer();
    if (player) {
      await player.mute();
      setSound("MUTE");
    }
  };
  const setData = playerStore((state) => state.setData);
  const setVisibility = playerStore((state) => state.setVisibility);
  const setPosition = playerStore((state) => state.setPosition);
  const thumbnailRef = useRef<null | HTMLDivElement>(null);

  const openPreviewPlayer = () => {
    const scaleUpIndex = 1.5;
    const xAnimated = isFirstOneOfSlide ? 30 : 0;
    const yAnimated = -45;
    if (trailerData && detailsData) setData(item, trailerData, detailsData);
    if (thumbnailRef.current instanceof HTMLDivElement) {
      const clientRect = thumbnailRef.current.getBoundingClientRect();
      const widthGap = clientRect.width - clientRect.width / scaleUpIndex;
      const heightGap = clientRect.height - clientRect.height / scaleUpIndex;
      setPosition(
        clientRect.x + widthGap / 2 - xAnimated,
        clientRect.y + heightGap / 2 - yAnimated
      );
    }

    setVisibility(true);
  };
  const onClickMoreButton = () => {
    onMouseLeave();
    openPreviewPlayer();
  };

  return (
    <Frame
      whileHover={{
        scale: activePlayer ? 1.5 : 1.1,
        zIndex: activePlayer ? 2 : 1,
      }}
      animate={{
        x: activePlayer && isFirstOneOfSlide ? 30 : 0,
        y: activePlayer ? -45 : 0,
        scale: activePlayer ? 1.5 : 1,
        zIndex: activePlayer ? 2 : 0,
        transition: {
          duration: 0.4,
          scale: {
            duration: 0.4,
          },
        },
      }}
      onMouseLeave={onMouseLeave}
    >
      {/* {isPreviewPlayerOpen && <PreviewPlayer />} */}
      <Thumbnail
        ref={thumbnailRef}
        $activePlayer={activePlayer}
        $backdropPath={createImagePath(item.backdrop_path, "w342")}
        onClick={onClickThumbnail}
      >
        <LogoBox>
          <NetflixSmallLogo $logoWidth="13px" />
        </LogoBox>
        <Title>{item.title}</Title>
        {activePlayer && (
          <>
            <Player
              variants={playerVariants}
              initial="inactive"
              animate={isPlayingViedeo ? "active" : "inactive"}
            >
              {trailerData && (
                <YouTube
                  ref={youtubeRef}
                  videoId={trailerData.results[0].key}
                  opts={{
                    width: "100%",
                    height: itemHeight,
                    playerVars: {
                      controls: 0, //disable control of users
                      disablekb: 0, //disable keyboard
                      rel: 0, // hide recomended videos
                    },
                  }}
                  onReady={onReadyPlayer}
                />
              )}
            </Player>
            <Controller
              variants={controllerVariants}
              initial="inactive"
              animate={isPlayingViedeo ? "active" : "inactive"}
            >
              {sound === "UNMUTE" && (
                <MuteButton onClick={onMute}>
                  <MuteIcon $iconWidth="9px" />
                </MuteButton>
              )}

              {sound === "MUTE" && (
                <UnMuteButton onClick={onUnMute}>
                  <UnMuteIcon $iconWidth="9px" />
                </UnMuteButton>
              )}
            </Controller>
          </>
        )}
      </Thumbnail>

      <DescriptionLayer
        animate={{
          display: activePlayer ? "flex" : "none",
          opacity: activePlayer ? 1 : 0,
        }}
        transition={{ delay: 0.3 }}
      >
        <Menu>
          <PlayButton onClick={onClickPreview}>
            <PlayIcon iconwidth="9px" />
          </PlayButton>
          <AddButton>
            <AddIcon $iconWidth="9px" />
          </AddButton>
          <LikeButton>
            <ThumbsUpIcon $iconWidth="9px" />
          </LikeButton>
          <MoreButton onClick={onClickMoreButton}>
            <DownArrowIcon $iconWidth="9px" />
          </MoreButton>
        </Menu>
        <PreviewDetails>
          <span style={{ color: "#46D369", fontWeight: 500 }}>New</span>
          <div
            style={{
              border: "0.5px solid rgb(240, 240, 240)",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>TV-MA</span>
          </div>
          <span>Nth Seasons</span>
          <div
            style={{
              border: "0.5px solid rgb(188, 188, 188)",
              borderRadius: "2px",
              width: "15px",
              height: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "6px" }}>HD</span>
          </div>
        </PreviewDetails>
        <PreviewGenres>
          {detailsData
            ? detailsData.genres.map((genre, index) => (
                <div
                  key={index}
                  style={{ display: "flex", gap: "2px", fontWeight: 500 }}
                >
                  <span>{genre.name}</span>
                  {index === detailsData.genres.length - 1 ? null : (
                    <DotIcon $iconWidth="2px" />
                  )}
                </div>
              ))
            : null}
        </PreviewGenres>
      </DescriptionLayer>
    </Frame>
  );
};

export default ThumbnailPlayer;
