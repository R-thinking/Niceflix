import { styled } from "styled-components";

interface ICloseIconProps {
  $iconWidth: string;
}

const Svg = styled.svg<ICloseIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const CloseIcon: React.FC<{ $iconWidth: string }> = ({ $iconWidth }) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 17L9 9L17 1M1 1L17 17" stroke="white" strokeWidth="3" />
    </Svg>
  );
};

export default CloseIcon;
