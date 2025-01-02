import { useQuery } from "react-query";
import { getNowPlaying } from "../api/movie";
import { isAxiosError } from "axios";
import styled from "styled-components";
import { getMovieThumbnail } from "../api/youtube";
import BannerPlayer from "../Components/BannerPlayer";
import { useEffect, useState } from "react";
import { playerStore } from "../stores";
import PreviewPlayer from "../Components/PreviewPlayer";

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
  const { data, isLoading, error, isError } = useQuery(
    ["movies", "nowPlaying"],
    getNowPlaying
  );
  if (isError) {
    if (isAxiosError(error)) {
    }
  }
  const removeLostItem = () => {
    const realData = {
      ...data,
      results: data?.results?.filter((item) => item.backdrop_path !== null),
    };
    return realData;
  };
  const [movieItem, setMovieItem] = useState<any>(null);
  useEffect(() => {
    if (isLoading) return;
    setMovieItem(removeLostItem());
  }, [data]);

  const { data: thumbnailData } = useQuery(["thumbnail"], getMovieThumbnail);
  const isVisible = playerStore((state) => state.isVisible);

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
        </>
      )}
    </Wrapper>
  );
};
export default Home;
