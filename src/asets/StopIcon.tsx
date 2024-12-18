import { styled } from "styled-components";

interface IStopIconProps {
  iconwidth: string;
}

const Svg = styled.svg<IStopIconProps>`
  width: ${(props) => props.iconwidth};
  fill: #000000;
`;

const StopIcon = ({ iconwidth }: IStopIconProps) => {
  return (
    <Svg
      iconwidth={iconwidth}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
    </Svg>
  );
};

export default StopIcon;
