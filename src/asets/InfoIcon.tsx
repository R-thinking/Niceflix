import { styled } from "styled-components";

interface IInfoIconProps {
  iconwidth: string;
}

const Svg = styled.svg<IInfoIconProps>`
  width: ${(props) => props.iconwidth};
`;
const InfoIcon = ({ iconwidth }: IInfoIconProps) => {
  return (
    <Svg
      iconwidth={iconwidth}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13" cy="13" r="12" stroke="white" stroke-width="2" />
      <path
        d="M13.5019 9.768C13.1659 9.768 12.8619 9.64 12.6219 9.4C12.3659 9.16 12.2379 8.856 12.2379 8.504C12.2379 8.152 12.3659 7.848 12.6219 7.608C12.8619 7.368 13.1659 7.24 13.5019 7.24C13.8379 7.24 14.1419 7.368 14.3979 7.608C14.6379 7.848 14.7659 8.152 14.7659 8.504C14.7659 8.856 14.6379 9.16 14.3979 9.4C14.1419 9.64 13.8379 9.768 13.5019 9.768ZM12.4779 19V10.728H14.5099V19H12.4779Z"
        fill="white"
      />
    </Svg>
  );
};

export default InfoIcon;
