import { styled } from "styled-components";

const Svg = styled.svg<ICommonIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const AccountIcon: React.FC<{ $iconWidth: string }> = ({ $iconWidth }) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="8.49915" r="4.5" stroke="#B3B3B3" strokeWidth="2" />
      <path
        d="M25.5 23.9991C25.5 25.1836 25.2626 25.9351 24.9252 26.4328C24.595 26.92 24.0964 27.271 23.3572 27.5184C22.6001 27.7718 21.6396 27.8995 20.4603 27.9569C19.4893 28.0042 18.4257 28.0022 17.2589 28.0001C17.0107 27.9996 16.7577 27.9991 16.5 27.9991C16.2619 27.9991 16.0265 27.9995 15.7938 27.9998C13.115 28.0035 10.8096 28.0067 9.10691 27.5071C8.21442 27.2453 7.58941 26.8701 7.1807 26.3649C6.77971 25.8692 6.5 25.1409 6.5 23.9991C6.5 19.462 10.5816 15.9991 16 15.9991C21.4184 15.9991 25.5 19.462 25.5 23.9991Z"
        stroke="#B3B3B3"
        strokeWidth="2"
      />
    </Svg>
  );
};

export default AccountIcon;
