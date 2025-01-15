import { useQuery } from "react-query";
import { getNowPlaying, getPopular, getTopRated } from "../api/movie";
import { isAxiosError } from "axios";
import styled from "styled-components";
import { getMovieThumbnail } from "../api/youtube";
import BannerPlayer from "../Components/BannerPlayer";
import { useEffect, useState } from "react";
import { playerStore } from "../stores";
import PreviewPlayer from "../Components/PreviewPlayer";
import MovieSlider from "../Components/MovieSlider";

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

  const {
    data: popularData,
    error: popularError,
    isError: isPopular,
  } = useQuery(["movies", "popular"], getPopular);
  if (isPopular) {
    if (isAxiosError(popularError)) {
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
          {topRatedData && (
            <MovieSlider
              sliderID="TOR_RATED"
              slideItems={topRatedData.results}
            />
          )}
          {popularData && (
            <MovieSlider sliderID="POPULAR" slideItems={popularData.results} />
          )}
        </>
      )}
    </Wrapper>
  );
};
export default Home;
