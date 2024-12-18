import { useQuery } from "react-query";
import { getNowPlaying } from "../api/movie";
import { isAxiosError } from "axios";
import styled from "styled-components";
import { createImagePath } from "../utilities/image";
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { getMovieThumbnail } from "../api/youtube";
import BannerPlayer from "../Components/BannerPlayer";

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ backdroppath: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(83, 83, 83, 0.3),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.backdroppath});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 40px;
  width: 70%;
`;

const Overview = styled.p`
  font-size: 16px;
  width: 40%;
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

const Home = () => {
  const youtubeRef = useRef<YouTube>(null);

  const { data, isLoading, error, isError } = useQuery(
    ["movies", "nowPlaying"],
    getNowPlaying
  );
  if (isError) {
    if (isAxiosError(error)) console.error("failed", error.message);
  }

  const { data: thumbnailData } = useQuery(["thumbnail"], getMovieThumbnail);

  const [isEntered, setIsEntered] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const onMouseEnter = async () => {
    const player = youtubeRef?.current?.getInternalPlayer();
    await player?.playVideo();
    setIsEntered(true);
  };

  const onMouseLeave = async () => {
    const player = youtubeRef?.current?.getInternalPlayer();
    await player?.stopVideo();
    setIsEntered(false);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* <Banner
            backdroppath={createImagePath(data?.results[0].backdrop_path ?? "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner> */}
          {data ? (
            <BannerPlayer
              movie={data.results[0]}
              bannerProps={{ playerWidth: "100%", playerHeight: "100vh" }}
            />
          ) : null}
          {/* <div
            style={{
              position: "relative",
              width: "640px",
              height: "360px",
              backgroundColor: "transparent",
              zIndex: 2,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <YouTube
              ref={youtubeRef}
              videoId="041KTRpr0XU"
              opts={{
                playerVars: {
                  controls: 0,
                  disablekb: 0,
                  rel: 0,
                },
              }}
              onReady={(event: any) => {
                // setIsReady(true);
              }}
            />
            {isReady ? (
              <motion.img
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0 }}
                transition={{
                  delay: !isEntered ? 0.5 : 0,
                  duration: !isEntered ? 1.5 : 0,
                  ease: "easeIn",
                }}
                src={thumbnailData?.high.url}
              />
            ) : null} 
          </div>*/}
        </>
      )}
    </Wrapper>
  );
};
export default Home;
