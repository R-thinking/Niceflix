import { styled } from "styled-components";

interface IAudioDescriptionIconProps {
  $iconWidth: string;
}

const Svg = styled.svg<IAudioDescriptionIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const AudioDescriptionIcon: React.FC<{ $iconWidth: string }> = ({
  $iconWidth,
}) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 39 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 16.8086L11.1999 0.808691H15.9999V16.8086H11.9999V15.2086H7.19996L5.59997 16.8086H0ZM11.9999 6.40866L8.79995 11.2086H11.9999V6.40866Z"
        fill="#BCBCBC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7999 0.808691V16.8086H24.7998C26.3998 16.5419 29.5998 15.2086 29.5998 8.80864C29.3332 6.14199 27.6798 0.808691 23.1999 0.808691H16.7999ZM20.7999 12.0086V5.60866C23.9999 5.60866 24.7998 7.74198 24.7998 8.80864C24.7998 11.3686 23.7332 12.0086 23.1999 12.0086H20.7999Z"
        fill="#BCBCBC"
      />
      <path
        d="M28.7998 0.808691C31.9998 2.40858 31.9998 15.2085 28.7998 16.8086H29.5998C33.5998 14.4085 33.5998 3.20858 29.5998 0.808594L28.7998 0.808691Z"
        fill="#BCBCBC"
      />
      <path
        d="M31.9998 0.808691C35.1998 2.40858 35.1998 15.2085 31.9998 16.8086H32.7998C36.7998 14.4085 36.7998 3.20858 32.7998 0.808594L31.9998 0.808691Z"
        fill="#BCBCBC"
      />
      <path
        d="M35.1998 0.808691C38.3998 2.40858 38.3998 15.2085 35.1998 16.8086H35.9998C39.9998 14.4085 39.9998 3.20858 35.9998 0.808594L35.1998 0.808691Z"
        fill="#BCBCBC"
      />
    </Svg>
  );
};

export default AudioDescriptionIcon;
