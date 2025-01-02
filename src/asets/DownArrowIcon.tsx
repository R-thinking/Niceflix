import { styled } from "styled-components";

interface IDownArrowIconProps {
  $iconWidth: string;
}

const Svg = styled.svg<IDownArrowIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const DownArrowIcon: React.FC<{ $iconWidth: string }> = ({ $iconWidth }) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.99951 2.00049L7.99951 8.00049L13.9995 2.00049"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </Svg>
  );
};

export default DownArrowIcon;
