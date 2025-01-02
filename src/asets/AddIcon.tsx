import { styled } from "styled-components";

interface IAddIconProps {
  $iconWidth: string;
}

const Svg = styled.svg<IAddIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const AddIcon: React.FC<{ $iconWidth: string }> = ({ $iconWidth }) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.2 7.2L7.2 0H8.8L8.8 7.2L16 7.2V8.8L8.8 8.8L8.8 16H7.2L7.2 8.8L0 8.8V7.2L7.2 7.2Z"
        fill="white"
      />
    </Svg>
  );
};

export default AddIcon;
