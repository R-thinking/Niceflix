import { motion } from "framer-motion";
import styled from "styled-components";

interface IDotProps {
  $iconWidth: string;
}

const Svg = styled(motion.svg)<IDotProps>`
  width: ${(props) => props.$iconWidth};
  fill: ${(props) => props.theme.logoFillColor};
  path {
    stroke-width: 0.5px;
    stroke: white;
  }
`;

const DotIcon: React.FC<{ $iconWidth: string }> = ({ $iconWidth }) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2" fill="#808080" />
    </Svg>
  );
};

export default DotIcon;
