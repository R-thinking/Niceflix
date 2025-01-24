import { styled } from "styled-components";
import GithubIcon from "../asets/GithubIcon";
import LinkedinIcon from "../asets/LinkedinIcon";

const FooterContainer = styled.div`
  margin-top: 150px;
  height: 300px;
  width: 100vw;
  background-color: #121212;
  color: #ffffff;
  border-top: 6px solid rgba(74, 74, 74, 0.274);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 48px;
`;
const Email = styled.div`
  font-size: 24px;
`;
const ContactLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;
const GithubLink = styled.a``;
const LinkedinLink = styled.a``;
const CopyRight = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Title>Let's talk</Title>
      <Email>making.r.w@gmail.com</Email>
      <ContactLinks>
        <GithubLink href="https://github.com/R-thinking" target="_blank">
          <GithubIcon $iconWidth="35px" />
        </GithubLink>
        <LinkedinLink
          href="https://www.linkedin.com/in/hojun-ji-403494214/"
          target="_blank"
        >
          <LinkedinIcon $iconWidth="35px" />
        </LinkedinLink>
      </ContactLinks>
      <CopyRight>R-thinking - All rights reserved</CopyRight>
    </FooterContainer>
  );
};

export default Footer;
