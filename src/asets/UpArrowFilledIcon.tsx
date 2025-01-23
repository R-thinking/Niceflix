import { styled } from "styled-components";

const Svg = styled.svg<ICommonIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const UpArrowFilledIcon: React.FC<{ $iconWidth: string }> = ({
  $iconWidth,
}) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0L14.9282 7.5H1.0718L8 0Z" fill="white" />
    </Svg>
  );
};

export default UpArrowFilledIcon;
