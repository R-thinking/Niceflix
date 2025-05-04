import { styled } from "styled-components";

const Svg = styled.svg<ICommonIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const SmileIcon: React.FC<{ $iconWidth: string }> = ({ $iconWidth }) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6"
        y="4.5"
        width="20"
        height="20"
        rx="3"
        stroke="#B3B3B3"
        strokeWidth="2"
      />
      <rect x="16" y="23.5" width="3" height="2" fill="#141414" />
      <path
        d="M11.9996 28.5L16.3633 24.5L11.9996 20.5"
        stroke="#B3B3B3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="10" y="10" width="3" height="3" rx="1.5" fill="#B3B3B3" />
      <rect x="19" y="10" width="3" height="3" rx="1.5" fill="#B3B3B3" />
      <path
        d="M14 17C14 17 16.1193 17.5 17.5 17.5C18.8807 17.5 21 17 21 17"
        stroke="#B3B3B3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SmileIcon;
