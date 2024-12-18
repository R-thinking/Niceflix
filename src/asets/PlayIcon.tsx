import { styled } from "styled-components";

interface IPlayIconProps {
  iconwidth: string;
}

const Svg = styled.svg<IPlayIconProps>`
  width: ${(props) => props.iconwidth};
  fill: #000000;
`;

const PlayIcon = ({ iconwidth }: IPlayIconProps) => {
  return (
    <Svg
      iconwidth={iconwidth}
      viewBox="0 0 20 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.4951 11.5876C20.1603 11.9831 20.1436 12.9519 19.465 13.324L1.48089 23.1878C0.81446 23.5533 6.94647e-07 23.0711 6.71762e-07 22.311L5.29227e-08 1.7577C2.95747e-08 0.982254 0.844358 0.501877 1.51094 0.898088L19.4951 11.5876Z" />
    </Svg>
  );
};

export default PlayIcon;
