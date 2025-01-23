import { styled } from "styled-components";

interface IDownArrowFilledIconProps {
  $iconWidth: string;
}

const Svg = styled.svg<IDownArrowFilledIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const DownArrowFilledIcon: React.FC<{ $iconWidth: string }> = ({
  $iconWidth,
}) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 0.5L5 5.5L10 0.5H0Z"
        fill="white"
      />
    </Svg>
  );
};

export default DownArrowFilledIcon;
