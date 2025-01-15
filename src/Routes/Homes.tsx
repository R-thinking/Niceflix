import { useQuery } from "react-query";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "../api/movie";
import { isAxiosError } from "axios";
import styled from "styled-components";
import { getMovieThumbnail } from "../api/youtube";
import BannerPlayer from "../Components/BannerPlayer";
import { useEffect, useState } from "react";
import { globalStore, playerStore } from "../stores";
import PreviewPlayer from "../Components/PreviewPlayer";
import MovieSlider from "../Components/MovieSlider";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
`;

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 50px;
`;

const Home = () => {
  const history = useHistory();
  const isLogin = globalStore((state) => state.isLogin);
  if (!isLogin) {
    history.push("/login");
  }

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
    isError: isPopularError,
  } = useQuery(["movies", "popular"], getPopular);
  if (isPopularError) {
    if (isAxiosError(popularError)) {
    }
  }

  const {
    data: upcomingData,
    error: upcomingError,
    isError: isUpcomingError,
  } = useQuery(["movies", "upcoming"], getUpcoming);
  if (isUpcomingError) {
    if (isAxiosError(upcomingError)) {
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          {movieItem ? (
            <BannerPlayer
              movie={movieItem.results[0]}
              bannerProps={{ playerWidth: "100%", playerHeight: "100vh" }}
              slideItems={movieItem.results.slice(1)}
            />
          ) : null}
          {isVisible && <PreviewPlayer />}
          <ContentBox>
            {topRatedData && (
              <MovieSlider
                sliderID="TOR_RATED"
                slideItems={topRatedData.results}
              />
            )}
            {popularData && (
              <MovieSlider
                sliderID="POPULAR"
                slideItems={popularData.results}
              />
            )}
            {upcomingData && (
              <MovieSlider
                sliderID="UPCOMING"
                slideItems={upcomingData.results}
              />
            )}
          </ContentBox>
        </Wrapper>
      )}
    </>
  );
};
export default Home;
