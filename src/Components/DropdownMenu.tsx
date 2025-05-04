import styled from "styled-components";
import UpArrowFilledIcon from "../asets/UpArrowFilledIcon";

const DropdownContainer = styled.div`
  background-color: #141414;
  position: absolute;
  bottom: -305px;
  right: 0;
  cursor: auto;
`;

const DropdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const Indicator = styled.div`
  position: absolute;
  top: -12px;
  right: 23px;
`;

const MenuContainer = styled.div`
  border: 1px solid #a5a5a5;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
const Menu = styled.div<{ $width?: string; $height?: string }>`
  width: ${(props) => (props.$width ? props.$width : "218px")};
  height: ${(props) => (props.$height ? props.$height : "43px")};
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;

const TextButton = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  display: flex;
`;

interface IMenu {
  icon?: JSX.Element;
  name: string;
  onClick: () => void;
  width?: string;
  height?: string;
}

const DropdownMenu: React.FC<{
  toggleDisplay: () => void;
  menus: IMenu[];
  footers?: IMenu[];
}> = ({ menus, footers, toggleDisplay }) => {
  return (
    <DropdownContainer>
      <DropdownOverlay onClick={toggleDisplay} />
      <Indicator>
        <UpArrowFilledIcon $iconWidth="16px" />
      </Indicator>
      <MenuContainer>
        {menus.map((menu, menuIndex) => (
          <Menu $width={menu.width} $height={menu.height} key={menuIndex}>
            {menu.icon}
            <TextButton
              onClick={() => {
                menu.onClick();
                toggleDisplay();
              }}
            >
              {menu.name}
            </TextButton>
          </Menu>
        ))}
      </MenuContainer>
      <Footer>
        {footers
          ? footers.map((footer, footerIndex) => (
              <Menu
                $width={footer.width}
                $height={footer.height}
                style={{ justifyContent: "center" }}
                key={footerIndex}
              >
                {footer.icon}
                <TextButton
                  onClick={() => {
                    footer.onClick();
                    toggleDisplay();
                  }}
                >
                  {footer.name}
                </TextButton>
              </Menu>
            ))
          : null}
      </Footer>
    </DropdownContainer>
  );
};

export default DropdownMenu;
