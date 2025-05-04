import { useQuery } from "react-query";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "../api/movie";
import { isAxiosError } from "axios";
import styled from "styled-components";
import BannerPlayer from "../Components/BannerPlayer";
import { useEffect, useRef, useState } from "react";
import { playerStore, userStore } from "../stores";
import PreviewPlayer from "../Components/PreviewPlayer";
import MovieSlider from "../Components/MovieSlider";
import { useHistory } from "react-router-dom";
import CustomModal from "../Components/CustomModal";

const Wrapper = styled.div`
  /* height: 100vh; */
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
  const isLogin = userStore((state) => state.isLogin);
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

  const [activeSlider, setActiveSlider] = useState("");
  const isActveSlider = (sliderID: TMovieList) => sliderID === activeSlider;
  interface IMoviesliders {
    NOW_PLAYING: HTMLDivElement | null;
    TOP_RATED: HTMLDivElement | null;
    POPULAR: HTMLDivElement | null;
    UPCOMING: HTMLDivElement | null;
  }
  const movieSlidersRef = useRef<IMoviesliders>({
    NOW_PLAYING: null,
    TOP_RATED: null,
    POPULAR: null,
    UPCOMING: null,
  });

  const moviSliderIDs: TMovieList[] = [
    "NOW_PLAYING",
    "TOP_RATED",
    "POPULAR",
    "UPCOMING",
  ];

  const onClickMovieSlider = (sliderID: TMovieList) => {
    moviSliderIDs.map((id) => {
      if (id !== sliderID) {
        if (movieSlidersRef.current[id] instanceof HTMLDivElement) {
          (movieSlidersRef.current[id] as HTMLDivElement).style.zIndex = "-1"; //typescript error
        }
      }
    });
  };

  const onMouseLeaveMovieSlider = (sliderID: TMovieList) => {
    moviSliderIDs.map((id) => {
      if (id !== sliderID) {
        if (movieSlidersRef.current[id] instanceof HTMLDivElement) {
          (movieSlidersRef.current[id] as HTMLDivElement).style.zIndex = "1"; //typescript error
        }
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <CustomModal
            modalID="HOME_USAGE_NOTICE"
            content={{
              title: "사용 안내",
              body: [
                "배너 위에서 마우스를 움직이지 않는다면 주기적으로 영상이 나옵니다.(약 30초간격)",
                "슬라이더에 있는 영화에 마우스 hover할 때, 자세히 버튼을 누를 경우 영상이 나옵니다.(약 5초후)",
                "다만 실제 영상이 없어 관련 유튜브 영상을 불러오는 방식으로 제작하였습니다.",
                "넷플릭스와 최대한 비슷한 형식을 위해 유튜브 메뉴가 뜨지 못하도록 하였음을 양해부탁드립니다.",
                "광고가 나올 경우 다시 시도하시거나 다른 영상으로 눌러주시기 바랍니다.",
                "",
                "",
                "* 관련 유튜브 영상 id가 존재하지 않을 경우 영상이 뜨지 않는 경우가 발생 할 수 있습니다.",
              ],
            }}
            options={{ dontOpenAgain: { visible: true } }}
          />
          {movieItem ? (
            <div
              ref={(el: HTMLDivElement) =>
                (movieSlidersRef.current["NOW_PLAYING"] = el)
              }
              onClick={() => onClickMovieSlider("NOW_PLAYING")}
              onMouseLeave={() => onMouseLeaveMovieSlider("NOW_PLAYING")}
            >
              <BannerPlayer
                movie={movieItem.results[0]}
                bannerProps={{ playerWidth: "100%", playerHeight: "100vh" }}
                slideItems={movieItem.results.slice(1)}
              />
            </div>
          ) : null}
          {isVisible && <PreviewPlayer />}
          <ContentBox>
            {topRatedData && (
              <div
                ref={(el: HTMLDivElement) =>
                  (movieSlidersRef.current["TOP_RATED"] = el)
                }
                onClick={() => onClickMovieSlider("TOP_RATED")}
                onMouseLeave={() => onMouseLeaveMovieSlider("TOP_RATED")}
              >
                <MovieSlider
                  sliderID="TOP_RATED"
                  slideItems={topRatedData.results}
                />
              </div>
            )}
            {popularData && (
              <div
                ref={(el: HTMLDivElement) =>
                  (movieSlidersRef.current["POPULAR"] = el)
                }
                onClick={() => onClickMovieSlider("POPULAR")}
                onMouseLeave={() => onMouseLeaveMovieSlider("POPULAR")}
              >
                <MovieSlider
                  sliderID="POPULAR"
                  slideItems={popularData.results}
                />
              </div>
            )}
            {upcomingData && (
              <div
                ref={(el: HTMLDivElement) =>
                  (movieSlidersRef.current["UPCOMING"] = el)
                }
                onClick={() => onClickMovieSlider("UPCOMING")}
                onMouseLeave={() => onMouseLeaveMovieSlider("UPCOMING")}
              >
                <MovieSlider
                  sliderID="UPCOMING"
                  slideItems={upcomingData.results}
                />
              </div>
            )}
          </ContentBox>
        </Wrapper>
      )}
    </>
  );
};
export default Home;
