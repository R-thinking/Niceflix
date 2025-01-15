import styled from "styled-components";
import CustomModal from "./CustomModal";

const BackgroundImage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${() =>
    `url(${process.env.PUBLIC_URL}/assets/coming_soon.jpg)`};
  background-size: cover;
`;
const ComingSoon = () => {
  return (
    <>
      <CustomModal
        content={{
          title: "Coming Soon!",
          body: ["아직 개발중인 페이지입니다."],
        }}
      />
      <BackgroundImage />
    </>
  );
};

export default ComingSoon;
