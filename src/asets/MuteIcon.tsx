import { motion } from "framer-motion";
import { styled } from "styled-components";

interface IThumbsIconProps {
  $iconWidth: string;
}

const Svg = styled.svg<IThumbsIconProps>`
  width: ${(props) => props.$iconWidth};
`;

const MuteIcon: React.FC<{ $iconWidth: string; $isHover?: boolean }> = ({
  $iconWidth,
  $isHover,
}) => {
  return (
    <Svg
      $iconWidth={$iconWidth}
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M8.34158 0.0657487C8.2117 0.00955863 8.06924 -0.0111634 7.92873 0.00569722C7.78823 0.0225579 7.65471 0.0763974 7.54181 0.161721L3.71892 3.18484H0.799768C0.587656 3.18484 0.384232 3.26911 0.234247 3.41909C0.084261 3.56908 0 3.7725 0 3.98461V8.78322C0 8.99533 0.084261 9.19876 0.234247 9.34874C0.384232 9.49873 0.587656 9.58299 0.799768 9.58299H3.71892L7.50182 12.6061C7.64254 12.719 7.81728 12.781 7.99768 12.7821C8.11714 12.784 8.23525 12.7566 8.34158 12.7021C8.47768 12.6373 8.59269 12.5353 8.67334 12.4079C8.754 12.2806 8.79702 12.133 8.79745 11.9823V0.78554C8.79702 0.634795 8.754 0.487239 8.67334 0.359886C8.59269 0.232533 8.47768 0.130569 8.34158 0.0657487ZM7.19791 10.3188L4.4947 8.1594C4.35399 8.04651 4.17924 7.9845 3.99884 7.98345H1.59954V4.78438H3.99884C4.17924 4.78333 4.35399 4.72133 4.4947 4.60843L7.19791 2.44906V10.3188ZM14.3238 6.38392L15.7634 4.95233C15.838 4.87776 15.8972 4.78924 15.9375 4.69181C15.9779 4.59438 15.9986 4.48995 15.9986 4.3845C15.9986 4.27904 15.9779 4.17461 15.9375 4.07719C15.8972 3.97976 15.838 3.89123 15.7634 3.81666C15.6889 3.74209 15.6003 3.68294 15.5029 3.64258C15.4055 3.60223 15.3011 3.58146 15.1956 3.58146C15.0901 3.58146 14.9857 3.60223 14.8883 3.64258C14.7909 3.68294 14.7023 3.74209 14.6278 3.81666L13.1962 5.25624L11.7646 3.81666C11.614 3.66606 11.4097 3.58146 11.1968 3.58146C10.9838 3.58146 10.7795 3.66606 10.6289 3.81666C10.4783 3.96726 10.3937 4.17152 10.3937 4.3845C10.3937 4.59748 10.4783 4.80173 10.6289 4.95233L12.0685 6.38392L10.6289 7.8155C10.554 7.88985 10.4945 7.97831 10.4539 8.07576C10.4133 8.17322 10.3923 8.27776 10.3923 8.38334C10.3923 8.48892 10.4133 8.59345 10.4539 8.69091C10.4945 8.78837 10.554 8.87682 10.6289 8.95117C10.7033 9.02613 10.7917 9.08563 10.8892 9.12624C10.9866 9.16684 11.0912 9.18774 11.1968 9.18774C11.3023 9.18774 11.4069 9.16684 11.5043 9.12624C11.6018 9.08563 11.6902 9.02613 11.7646 8.95117L13.1962 7.51159L14.6278 8.95117C14.7021 9.02613 14.7906 9.08563 14.888 9.12624C14.9855 9.16684 15.09 9.18774 15.1956 9.18774C15.3012 9.18774 15.4057 9.16684 15.5032 9.12624C15.6006 9.08563 15.6891 9.02613 15.7634 8.95117C15.8384 8.87682 15.8979 8.78837 15.9385 8.69091C15.9791 8.59345 16 8.48892 16 8.38334C16 8.27776 15.9791 8.17322 15.9385 8.07576C15.8979 7.97831 15.8384 7.88985 15.7634 7.8155L14.3238 6.38392Z"
        fill="white"
        animate={{ fillOpacity: $isHover ? 1 : "0.5" }}
        fillOpacity="0.5"
      />
    </Svg>
  );
};

export default MuteIcon;