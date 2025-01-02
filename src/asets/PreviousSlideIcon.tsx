import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

interface IPreviousSlideIconProps {
  $iconWidth: string;
}

const inactiveColor = "rgb(210, 210, 210)";
const activeColor = "rgb(255, 255, 255)";

const Svg = styled(motion.svg)<IPreviousSlideIconProps>`
  width: ${(props) => props.$iconWidth};
  fill: ${inactiveColor};
  &:hover {
    fill: ${activeColor};
  }
`;

const SearchIcon = ({ $iconWidth }: IPreviousSlideIconProps) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
    </Svg>
  );
};

export default SearchIcon;
