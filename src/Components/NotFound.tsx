import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const NotFoundLogo = styled.div`
  font-size: 72px;
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const HomeLink = styled(Link)`
  font-size: 24px;
  font-weight: 400;
  font-style: italic;
`;

const NotFound = () => {
  return (
    <Container>
      <NotFoundLogo>Page Not Found</NotFoundLogo>
      <Description>
        <p>
          The page you are looking for doesn't exist or an other error occurred.
        </p>
        <p>
          Please head to our <HomeLink to="/">Home</HomeLink> that does exist.
        </p>
      </Description>
    </Container>
  );
};

export default NotFound;
