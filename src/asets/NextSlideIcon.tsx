import { motion } from "framer-motion";
import styled from "styled-components";

interface INextSlideIconProps {
  $iconWidth: string;
}

const inactiveColor = "rgb(200, 200, 200)";
const activeColor = "rgb(255, 255, 255)";
const Svg = styled(motion.svg)<INextSlideIconProps>`
  width: ${(props) => props.$iconWidth};
  fill: ${inactiveColor};
  &:hover {
    fill: ${activeColor};
  }
`;

const SearchIcon = ({ $iconWidth }: INextSlideIconProps) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
    </Svg>
  );
};

export default SearchIcon;
