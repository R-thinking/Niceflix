import styled from "styled-components";
import UpArrowFilledIcon from "../asets/UpArrowFilledIcon";

const NotificationContainer = styled.div`
  background-color: #141414;
  position: absolute;
  bottom: -523px;
  right: 0;
  cursor: auto;
`;

const NotificationOverlay = styled.div`
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
  right: 2px;
`;

const NoticeContainer = styled.div`
  border-top: 3px solid #ffffff;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: 350px;
  height: 500px;
  overflow: scroll;
`;
const Notice = styled.div`
  width: 100%;
  min-height: 120px;
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

interface INotice {
  description: string;
}

const NotificationModal: React.FC<{
  toggleDisplay: (event: React.MouseEvent) => void;
  notices: INotice[];
}> = ({ notices, toggleDisplay }) => {
  return (
    <NotificationContainer>
      <NotificationOverlay onClick={toggleDisplay} />
      <Indicator>
        <UpArrowFilledIcon $iconWidth="16px" />
      </Indicator>
      <NoticeContainer>
        {notices.map((notice) => (
          <Notice>
            <TextButton onClick={toggleDisplay}>
              {notice.description}
            </TextButton>
          </Notice>
        ))}
      </NoticeContainer>
      {/* <Footer>
        {footers
          ? footers.map((footer) => (
              <Notice
                $width={footer.width}
                $height={footer.height}
                style={{ justifyContent: "center" }}
              >
                <TextButton
                  onClick={() => {
                    toggleDisplay();
                  }}
                >
                  {footer.description}
                </TextButton>
              </Notice>
            ))
          : null}
      </Footer> */}
    </NotificationContainer>
  );
};

export default NotificationModal;
