import styled from "styled-components";

const BackgroundImage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("assets/Coming Soon.jpg");
  background-size: cover;
`;
const ComingSoon = () => {
  return <BackgroundImage />;
};

export default ComingSoon;
