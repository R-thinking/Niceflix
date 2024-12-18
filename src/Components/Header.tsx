import styled from "styled-components";
import NetflixFullLogo from "../asets/NetfilxFullLogo";
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, useRouteMatch } from "react-router-dom";
import SearchBox from "./SearchBox";

const Navigation = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  color: #c6c6c6;
  height: 68px;
  font-size: 14px;
  padding: 0 20px;
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
`;

const Items = styled.ul`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Item = styled(motion.li)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* const Circle = styled.span`
  position: absolute;
  bottom: -5px;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: ${(props) => props.theme.logoFillColor};
`; */

const Header = () => {
  const IsOnThisPage = (address: string) => useRouteMatch(address);
  const buttons = [
    { label: "Home", path: "/" },
    { label: "Shows", path: "/shows" },
    { label: "Movies", path: "/movies" },
    { label: "Latest", path: "/latest" },
    { label: "My List", path: "/my-list" },
  ];
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
      variants={navigationVariants}
      animate={navigationAnimation}
      initial="top"
    >
      <Column>
        <NetflixFullLogo logowidth="93px" />
        <Items>
          {buttons.map((button, index) => (
            <Item
              key={index}
              animate={
                IsOnThisPage(button.path)?.isExact
                  ? {
                      scale: 1.1,
                      color: "#eeeeee",
                      fontWeight: 500,
                    }
                  : {}
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Link to={button.path}>{button.label}</Link>
            </Item>
          ))}
        </Items>
      </Column>
      <Column>
        <SearchBox />
      </Column>
    </Navigation>
  );
};

export default Header;
