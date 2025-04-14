import styled from "styled-components";
import NetflixFullLogo from "../asets/NetflixFullLogo";
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, useRouteMatch } from "react-router-dom";
import SearchBox from "./SearchBox";
import { globalStore, userStore } from "../stores";
import BellIcon from "../asets/BellIcon";
import DownArrowFilledIcon from "../asets/DownArrowFilledIcon";
import { useRef, useState } from "react";
import AvatarIcon1 from "../asets/avatars/AvatarIcon1";
import DropdownMenu from "./DropdownMenu";
import PencilIcon from "../asets/PencilIcon";
import SmileIcon from "../asets/SmileIcon";
import AccountIcon from "../asets/AccountIcon";
import QuestionMarkIcon from "../asets/QuestionMarkIcon";
import NotificationModal from "./NotificationModal";

const Navigation = styled(motion.nav)<{ $leftCommonPadding: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  color: #c6c6c6;
  height: 68px;
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

const PersonalMenu = styled.div`
  margin-right: 3%;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Notification = styled.div`
  cursor: pointer;
  position: relative;
`;
const ProfileMenu = styled.div`
  position: relative;
`;

const ProfileContent = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const Header = () => {
  const leftCommonPadding = globalStore((state) => state.getCommonPadding());
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

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const toggleNotification = () => setIsNotificationOpen((state) => !state);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleDropDown = () => setIsDropDownOpen((state) => !state);

  const clearAllModal = () => {
    setIsNotificationOpen(false);
    setIsDropDownOpen(false);
  };

  const onClickNotification = () => {
    const prevState = isNotificationOpen;
    clearAllModal();
    setIsNotificationOpen(!prevState);
  };
  const onclickProfileMenu = () => {
    const prevState = isDropDownOpen;
    clearAllModal();
    setIsDropDownOpen(!prevState);
  };

  const setSignOut = userStore((state) => state.setSignOut);

  return (
    <Navigation
      $leftCommonPadding={leftCommonPadding}
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
      <PersonalMenu>
        <div onClick={clearAllModal}>
          <SearchBox />
        </div>
        <Notification>
          <div onClick={onClickNotification}>
            <BellIcon $iconWidth="20px" />
          </div>
          {isNotificationOpen && (
            <NotificationModal
              toggleDisplay={toggleNotification}
              notices={[
                { description: "Test Notice" },
                { description: "Test Notice" },
                { description: "Test Notice" },
                { description: "Test Notice" },
                { description: "Test Notice" },
                { description: "Test Notice" },
                { description: "Test Notice" },
                { description: "Test Notice" },
              ]}
            />
          )}
        </Notification>
        <ProfileMenu>
          <ProfileContent onClick={onclickProfileMenu}>
            <AvatarIcon1 $iconWidth="32px" />
            <motion.div
              style={{ display: "flex", justifyContent: "center" }}
              animate={{
                transform: isDropDownOpen ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              <DownArrowFilledIcon $iconWidth="10px" />
            </motion.div>
          </ProfileContent>
          {isDropDownOpen && (
            <DropdownMenu
              toggleDisplay={toggleDropDown}
              menus={[
                {
                  icon: <AvatarIcon1 $iconWidth="32px" />,
                  name: "Test User",
                  onClick: () => {},
                },
                {
                  icon: <PencilIcon $iconWidth="32px" />,
                  name: "Manage Profiles",
                  onClick: () => {},
                },
                {
                  icon: <SmileIcon $iconWidth="32px" />,
                  name: "Transfer Profiles",
                  onClick: () => {},
                },
                {
                  icon: <AccountIcon $iconWidth="32px" />,
                  name: "Account",
                  onClick: () => {},
                },
                {
                  icon: <QuestionMarkIcon $iconWidth="32px" />,
                  name: "Help Center",
                  onClick: () => {},
                },
              ]}
              footers={[
                {
                  name: "Sign out of the Netflix",
                  onClick: setSignOut,
                  height: "48px",
                },
              ]}
            />
          )}
        </ProfileMenu>
      </PersonalMenu>
    </Navigation>
  );
};

export default Header;
