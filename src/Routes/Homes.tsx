import { useQuery } from "react-query";
import { getNowPlaying } from "../api/movie";
import { isAxiosError } from "axios";
import styled from "styled-components";
import { getMovieThumbnail } from "../api/youtube";
import BannerPlayer from "../Components/BannerPlayer";

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
    if (isAxiosError(error)) console.error("failed", error.message);
  }

  const { data: thumbnailData } = useQuery(["thumbnail"], getMovieThumbnail);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {data ? (
            <BannerPlayer
              movie={data.results[0]}
              bannerProps={{ playerWidth: "100%", playerHeight: "100vh" }}
              slideItems={data.results.slice(1)}
            />
          ) : null}
        </>
      )}
    </Wrapper>
  );
};
export default Home;
