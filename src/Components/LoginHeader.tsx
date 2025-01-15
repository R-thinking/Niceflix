import styled from "styled-components";
import NetflixFullLogo from "../asets/NetflixFullLogo";
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { globalStore } from "../stores";

const Navigation = styled(motion.nav)<{ $leftCommonPadding: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  color: #c6c6c6;
  height: 88px;
  font-size: 14px;
  padding: 0 ${(props) => `${props.$leftCommonPadding}px`};
  z-index: 10;
`;

const navigationVariants = {
  top: { backgroundColor: "rgba(0, 0, 0, 0)" },
  scrolling: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
};

const Column = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  padding-left: 10%;
`;

const Header = () => {
  const leftCommonPadding = globalStore((state) => state.getCommonPadding());
  const navigationAnimation = useAnimation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 80) {
      navigationAnimation.start("scrolling");
    } else {
      navigationAnimation.start("top");
    }
  });

  return (
    <Navigation
      $leftCommonPadding={leftCommonPadding}
      variants={navigationVariants}
      animate={navigationAnimation}
      initial="top"
    >
      <Column>
        <NetflixFullLogo logowidth="150px" />
      </Column>
    </Navigation>
  );
};

export default Header;
