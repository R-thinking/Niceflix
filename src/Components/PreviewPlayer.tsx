import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { playerStore } from "../stores";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../asets/CloseIcon";
import YouTube from "react-youtube";
import MuteIcon from "../asets/MuteIcon";
import UnMuteIcon from "../asets/UnMuteIcon";
import PlayIcon from "../asets/PlayIcon";
import AddIcon from "../asets/AddIcon";
import ThumbsUpIcon from "../asets/ThumbsUpIcon";
import AudioDescriptionIcon from "../asets/AudioDescriptionICon";
import { getCredits, getKeywords } from "../api/movie";
import { useQuery } from "react-query";

const iconWidth = "13.5px";

const CircleButton = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(18, 18, 18, 0.2);
  cursor: pointer;
`;

const Frame = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled(motion.div)`
  width: 50vw;
  height: 95vh;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
`;

const MovieSection = styled(motion.section)<{
  $backdropPath: string;
  $activePlayer: boolean;
}>`
  width: 100%;
  flex: 2;
  background-image: url(${(props) => props.$backdropPath});
  background-size: cover;
  /* cursor: ${(props) => (props.$activePlayer ? "auto" : "pointer")}; */
  position: relative;
`;

const Player = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
`;
const playerVariants = {
  inactive: { zIndex: -1, opacity: 0 },
  active: { zIndex: 3, opacity: 1, transition: { duration: 1.5 } },
};

const GradientLayer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(83, 83, 83, 0.3),
    rgba(0, 0, 0, 1)
  );
  position: absolute;
  top: 0;
  left: 0;
`;

const CloseButton = styled(CircleButton)`
  background-color: rgba(55, 55, 55, 0.5);
  font-weight: 600;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  width: 25px;
  height: 25px;
`;

const SoundControl = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  right: 10px;
  z-index: 5;
  div {
    position: relative;
    border: 1.5px solid rgba(255, 255, 255, 0.2);
  }
`;
const SoundControlVariants = {
  inactive: { zIndex: -1, opacity: 0 },
  active: { zIndex: 5, opacity: 1, transition: { duration: 1.5 } },
};
const MuteButton = styled(CircleButton)``;
const UnMuteButton = styled(CircleButton)``;

/* Content covering movie section */
const CoverContainer = styled.div`
  width: 45%;
  z-index: 3;
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const MovieTitleBox = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    height: 100%;
  }
`;
const MovieLogo = styled.div<{ $backdropPath: string }>`
  background-image: url(${(props) => props.$backdropPath});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
`;
const TitleAsLogo = styled.span<{ $titleLength: number }>`
  font-family: "Bebas Neue", sans-serif;
  font-size: ${(props) => (props.$titleLength > 14 ? "50px" : "120px")};
  color: rgb(255, 255, 255);
  font-weight: 500;
`;

const PlayMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const RuntimeProgress = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
`;

const ProgressBar = styled.progress`
  flex: 6;
`;

const RuntimeInfo = styled.span`
  padding-left: 15px;
  flex: 4;
  font-size: 12px;
  font-weight: 600;
`;
const Controller = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 5px;
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 550;
    border-radius: 4px;
    font-size: 14px;
    border-radius: 4px;
  }
`;

const PlayButton = styled(motion.button)`
  width: 109px;
  height: 40px;
  background-color: white;
  color: black;
`;

const AddListButton = styled(CircleButton)`
  border: 1.5px solid rgba(255, 255, 255, 0.5);
`;

const LikeButton = styled(CircleButton)`
  border: 1.5px solid rgba(255, 255, 255, 0.5);
`;

/* Description Section */
const DescriptionLayer = styled.div`
  padding: 15px 30px;
  background-color: #121212;
  width: 100%;
  flex: 1;
  display: flex;
  gap: 15px;
`;

const MainInfoSection = styled.section`
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const VideoInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  font-size: 14px;
`;
const NewMark = styled.span`
  display: inline-flex;
  align-self: center;
  color: #46d369;
  font-weight: 500;
`;

const ReleaseYear = styled.span`
  display: inline-flex;
  align-self: center;
`;

const HDMark = styled.span`
  display: inline-flex;
  border: 0.5px solid rgb(188, 188, 188);
  border-radius: 2px;
  width: 25px;
  height: 80%;
  align-items: center;
  justify-content: center;
  align-self: center;
  font-size: 10px;
`;

const AudioDescriptionMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const MaturityRatings = styled.span`
  border: 0.5px solid rgb(240, 240, 240);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 0 5px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Overview = styled.div`
  font-size: 16px;
`;

const DetailInfoSection = styled.section`
  flex: 4;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 5px;
  font-weight: 500;
`;

const DetailTitle = styled.span`
  color: rgb(133, 133, 133);
`;

const Cast = styled.div``;
const Actor = styled(motion.span)``;
const ToggleActorsButton = styled(motion.span)`
  font-style: italic;
  font-weight: 600;
  color: rgb(218, 218, 218);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Genres = styled.div``;

const Caracteristic = styled.div``;

const PreviewPlayer = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [containerKey, setContainerKey] = useState(0);
  const [activePlayer, setActivePreview] = useState(false);
  const { movie, details, trailer, images } = playerStore(
    (state) => state.data
  );
  const { data: creditData } = useQuery(
    ["credits", movie?.id],
    () => {
      if (movie) return getCredits(movie.id);
    },
    {
      enabled: !!movie,
    }
  );
  const { data: keywordData } = useQuery(
    ["keyword", movie?.id],
    () => {
      if (movie) return getKeywords(movie.id);
    },
    { enabled: !!movie }
  );

  const setVisibility = playerStore((state) => state.setVisibility);
  const position = playerStore((state) => state.position);
  const hideVisibility = () => setVisibility(false);
  const closePlayer = () => {
    setContainerKey((prev) => prev + 1);
  };
  const deactivatePlayer = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    setContainerKey((prev) => prev + 1);
  };
  const resetAnimation = () => {
    hideVisibility();
    setContainerKey(0);
  };

  const youtubeRef = useRef<YouTube>(null);

  const [sound, setSound] = useState<TSoundState>("UNMUTE");
  const onUnMute = async () => {
    const player: IYoutubePlayer =
      await youtubeRef.current?.getInternalPlayer();
    if (player) {
      await player.unMute();
      setSound("UNMUTE");
    }
  };
  const onMute = async () => {
    if (!isPlayingVideo) return;
    const player: IYoutubePlayer =
      await youtubeRef.current?.getInternalPlayer();
    if (player) {
      await player.mute();
      setSound("MUTE");
    }
  };

  const [isHover, setIsHover] = useState(false);

  const [releaseYear, setReleaseYear] = useState(0);

  useEffect(() => {
    if (movie) {
      const date = new Date(movie.release_date);
      setReleaseYear(date.getFullYear());
    }
  }, []);

  const [expandedActors, setExpandedActors] = useState(false);
  const showMoreActors = () => setExpandedActors((prev) => !prev);

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const playLoop = async (player: IYoutubePlayer, duration: number) => {
    setTimeout(async () => {
      await player?.seekTo(0);
      await playLoop(player, duration);
    }, duration * 1000 - 1000);
  };
  const onReadyPlayer = async () => {
    const player: IYoutubePlayer =
      await youtubeRef.current?.getInternalPlayer();
    const duration = await player.getDuration();
    if (player) {
      await player.mute();
      await player.playVideo();
      setTimeout(async () => {
        handleResize();
        setIsPlayingVideo(true);
        await player.unMute();
      }, 5500);
      await playLoop(player, duration);
    }
  };
  const movieSectionRef = useRef<null | HTMLDivElement>(null);

  const handleResize = async () => {
    if (movieSectionRef.current) {
      const player: IYoutubePlayer =
        await youtubeRef.current?.getInternalPlayer();
      player?.setSize(
        movieSectionRef.current.getBoundingClientRect().width,
        movieSectionRef.current.getBoundingClientRect().height
      );
    }
  };
  useEffect(() => {
    const observer = new ResizeObserver(handleResize);

    // Add event listener for resize
    if (movieSectionRef.current) observer.observe(movieSectionRef.current);

    // Cleanup on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence onExitComplete={resetAnimation}>
      {containerKey === 0 && (
        <Frame
          key={containerKey}
          onClick={deactivatePlayer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <Container
            ref={containerRef}
            initial={{
              scale: 0,
              x: position.left,
              y: position.top,
            }}
            animate={{
              scale: 1,
              x: "50%",
              y: "2.5%",
            }}
            exit={{ scale: 0, x: position.left, y: position.top }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            {movie && (
              <MovieSection
                ref={movieSectionRef}
                $activePlayer={activePlayer}
                $backdropPath={images.backdropImage}
              >
                <Player
                  variants={playerVariants}
                  initial="inactive"
                  animate={isPlayingVideo ? "active" : "inactive"}
                >
                  {trailer && movieSectionRef.current && (
                    <YouTube
                      ref={youtubeRef}
                      videoId={trailer.results[0].key}
                      opts={{
                        width: "100%",
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
                <GradientLayer />
                <CloseButton
                  onClick={closePlayer}
                  whileHover={{
                    borderColor: "#ffffff",
                    backgroundColor: "#101010",
                  }}
                >
                  <CloseIcon $iconWidth="10px" />
                </CloseButton>
                <SoundControl
                  variants={SoundControlVariants}
                  initial="inactive"
                  animate={true ? "active" : "inactive"}
                >
                  {sound === "MUTE" && (
                    <MuteButton
                      whileHover={{
                        borderColor: "#ffffff",
                        backgroundColor: "rgba(113, 113, 113, 0.2)",
                      }}
                      onClick={onUnMute}
                    >
                      <MuteIcon $iconWidth={iconWidth} $isHover={isHover} />
                    </MuteButton>
                  )}

                  {sound === "UNMUTE" && (
                    <UnMuteButton
                      whileHover={{
                        borderColor: "#ffffff",
                        backgroundColor: "rgba(113, 113, 113, 0.2)",
                      }}
                      onClick={onMute}
                      onMouseOver={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                    >
                      <UnMuteIcon $iconWidth={iconWidth} $isHover={isHover} />
                    </UnMuteButton>
                  )}
                </SoundControl>
                <CoverContainer>
                  <MovieTitleBox>
                    {images.logoImage ? (
                      <MovieLogo $backdropPath={images.logoImage} />
                    ) : (
                      <TitleAsLogo $titleLength={movie.title.length}>
                        {movie.title}
                      </TitleAsLogo>
                    )}
                  </MovieTitleBox>
                  <PlayMenu>
                    <RuntimeProgress>
                      <ProgressBar max="100" value="70" />
                      {details && (
                        <RuntimeInfo>{`${Math.floor(
                          (details?.runtime * 70) / 100
                        )} out of ${
                          details?.runtime
                        } minutes\n watched`}</RuntimeInfo>
                      )}
                    </RuntimeProgress>
                    <Controller>
                      <PlayButton
                        whileHover={{
                          backgroundColor: "#b1b1b1",
                        }}
                      >
                        <PlayIcon iconwidth="18px" /> Play
                      </PlayButton>
                      <AddListButton
                        whileHover={{
                          borderColor: "#ffffff",
                          backgroundColor: "rgba(113, 113, 113, 0.2)",
                        }}
                      >
                        <AddIcon $iconWidth="14px" />
                      </AddListButton>
                      <LikeButton
                        whileHover={{
                          borderColor: "#ffffff",
                          backgroundColor: "rgba(113, 113, 113, 0.2)",
                        }}
                      >
                        <ThumbsUpIcon $iconWidth="14px" />
                      </LikeButton>
                    </Controller>
                  </PlayMenu>
                </CoverContainer>
              </MovieSection>
            )}
            {movie && (
              <DescriptionLayer>
                <MainInfoSection>
                  <VideoInfo>
                    <NewMark>New</NewMark>
                    <ReleaseYear>{releaseYear}</ReleaseYear>
                    <HDMark>HD</HDMark>
                    <MaturityRatings>G</MaturityRatings>
                    <AudioDescriptionMark>
                      <AudioDescriptionIcon $iconWidth="35px" />
                    </AudioDescriptionMark>
                  </VideoInfo>
                  <Description>
                    <Title>{movie.title}</Title>
                    <Overview>{movie.overview}</Overview>
                  </Description>
                </MainInfoSection>
                <DetailInfoSection>
                  <Cast>
                    <DetailTitle>Cast: </DetailTitle>
                    {creditData && (
                      <>
                        {creditData.cast.map((actor, index) =>
                          index < 4 ? (
                            <Actor key={index}>{`${actor.name}, `}</Actor>
                          ) : null
                        )}
                        {creditData.cast.length > 4 ? (
                          <>
                            {expandedActors &&
                              creditData.cast.map((actor, index) =>
                                index > 4 && index <= 10 ? (
                                  <Actor
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                      opacity: expandedActors ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {`${actor.name}, `}
                                  </Actor>
                                ) : null
                              )}
                            <ToggleActorsButton onClick={showMoreActors}>
                              {expandedActors ? "hide" : "more"}
                            </ToggleActorsButton>
                          </>
                        ) : null}
                      </>
                    )}
                  </Cast>
                  <Genres>
                    <DetailTitle>Genres: </DetailTitle>
                    {details &&
                      details.genres.map((genre, index) => (
                        <span key={index}>
                          {genre.name}
                          {index === details.genres.length - 1 ? "" : ", "}
                        </span>
                      ))}
                  </Genres>
                  <Caracteristic>
                    <DetailTitle>This Movie is: </DetailTitle>
                    {keywordData &&
                      keywordData.keywords.map((keyword, index) => (
                        <span key={index}>
                          {keyword.name}
                          {index === keywordData.keywords.length - 1
                            ? ""
                            : ", "}
                        </span>
                      ))}
                  </Caracteristic>
                </DetailInfoSection>
              </DescriptionLayer>
            )}
          </Container>
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default PreviewPlayer;
