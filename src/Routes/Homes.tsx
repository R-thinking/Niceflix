import { useQuery } from "react-query";
import { getNowPlaying, getTopRated } from "../api/movie";
import { isAxiosError } from "axios";
import styled from "styled-components";
import { getMovieThumbnail } from "../api/youtube";
import BannerPlayer from "../Components/BannerPlayer";
import { useEffect, useState } from "react";
import { playerStore } from "../stores";
import PreviewPlayer from "../Components/PreviewPlayer";
import TopRated from "../Components/TopRated";

const Wrapper = styled.div`
  /* height: 200vh; */
  position: relative;
`;

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const {
    data: nowPlayingData,
    isLoading,
    error: nowPlayingError,
    isError: isNowPlayingError,
  } = useQuery(["movies", "nowPlaying"], getNowPlaying);
  if (isNowPlayingError) {
    if (isAxiosError(nowPlayingError)) {
    }
  }
  const removeLostItem = () => {
    const realData = {
      ...nowPlayingData,
      results: nowPlayingData?.results?.filter(
        (item) => item.backdrop_path !== null
      ),
    };
    return realData;
  };
  const [movieItem, setMovieItem] = useState<any>(null);
  useEffect(() => {
    if (isLoading) return;
    setMovieItem(removeLostItem());
  }, [nowPlayingData]);

  const isVisible = playerStore((state) => state.isVisible);

  const {
    data: topRatedData,
    error: topRatedError,
    isError: isTopRatedError,
  } = useQuery(["movies", "topRated"], getTopRated);
  if (isTopRatedError) {
    if (isAxiosError(topRatedError)) {
    }
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {movieItem ? (
            <BannerPlayer
              movie={movieItem.results[0]}
              bannerProps={{ playerWidth: "100%", playerHeight: "100vh" }}
              slideItems={movieItem.results.slice(1)}
            />
          ) : null}
          {isVisible && <PreviewPlayer />}
          {topRatedData && <TopRated slideItems={topRatedData.results} />}
        </>
      )}
    </Wrapper>
  );
};
export default Home;
