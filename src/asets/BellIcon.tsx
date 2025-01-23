import { styled } from "styled-components";

interface IBellIconProps {
  $iconWidth: string;
}

const Svg = styled.svg<IBellIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const BellIcon: React.FC<{ $iconWidth: string }> = ({ $iconWidth }) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.04808 3.48418C9.38861 3.48418 10.1976 3.69952 10.1976 3.69952C12.3894 4.20178 13.9322 6.22063 13.9322 8.5V14.6352L14.3803 15.0854L14.7547 15.4615H3.24529L3.61971 15.0854L4.06784 14.6352V8.5C4.06784 6.22067 5.61058 4.20178 7.80236 3.69952C7.80236 3.69952 8.66981 3.48418 8.95192 3.48418M9 0C8.15375 0 7.50678 0.649904 7.50678 1.5V2.19995C4.66952 2.8501 2.52938 5.45 2.52938 8.5V14L0.538462 16V17H17.4615V16L15.4706 14V8.5C15.4706 5.45 13.3304 2.8501 10.4932 2.19995V1.5C10.4932 0.649904 9.84625 0 9 0ZM10.9909 18H7.00904C7.00904 19.1 7.90486 20 9 20C10.0951 20 10.9909 19.1 10.9909 18Z"
        fill="white"
      />
    </Svg>
  );
};

export default BellIcon;
