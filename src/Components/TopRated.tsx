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

const TopRated: React.FC<{
  slideItems: IMovie[];
}> = ({ slideItems }) => {
  const leftCommonPadding = globalStore((state) => state.getCommonPadding());
  return (
    <div>
      <SliedeTitle $leftCommonPadding={leftCommonPadding}>
        Top Rated
      </SliedeTitle>
      <Slider sliderID="topRated" videoType="MOVIE" items={slideItems} />
    </div>
  );
};

export default TopRated;
