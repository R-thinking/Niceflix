import { styled } from "styled-components";
import { globalStore } from "../stores";
import Slider from "./Slider";
import { IMovie } from "../api/movie";

const SliedeTitle = styled.div<{ $leftCommonPadding: number }>`
  font-size: 18px;
  font-weight: 600;
  padding-left: ${(props) => `${props.$leftCommonPadding}px`};
  margin-bottom: 5px;
`;

const sliderIdMap = new Map([
  ["NOW_PLAYING", "Now Playing"],
  ["TOR_RATED", "Top Rated"],
  ["POPULAR", "Popular"],
  ["UPCOMING", "Upcoming"],
]);

const MovieSlider: React.FC<{
  slideItems: IMovie[];
  sliderID: TMovieList;
}> = ({ slideItems, sliderID }) => {
  const leftCommonPadding = globalStore((state) => state.getCommonPadding());
  return (
    <div>
      <SliedeTitle $leftCommonPadding={leftCommonPadding}>
        {sliderIdMap.get(sliderID)}
      </SliedeTitle>
      <Slider sliderID={sliderID} videoType="MOVIE" items={slideItems} />
    </div>
  );
};

export default MovieSlider;
