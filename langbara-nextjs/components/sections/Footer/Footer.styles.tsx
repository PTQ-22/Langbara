import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #00161a;
  padding: 15vh 5vw 8vh 5vw;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    padding: 8vh 10vw 8vh 10vw;
  }
`;
export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10vh;
  width: 100%;
  @media screen and (max-width: 480px) {
    gap: 8vh;
  }
`;

export const FooterTopContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 5vh;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 5vw;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 2vh;
  }
`;
export const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vh;
`;
export const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4vh;
  @media screen and (max-width: 800px) {
    align-items: flex-start;
    width: 100%;
  }
`;

export const SponsorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

export const FooterLinks = styled.h1`
  cursor: pointer;
  color: white;
  font-size: 22pt;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  @media screen and (max-width: 1800px) {
    font-size: 20pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 18pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 16pt;
  }
`;

export const FooterSponsors = styled.h1`
  cursor: pointer;
  color: white;
  font-size: 16pt;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  @media screen and (max-width: 480px) {
    font-size: 14pt;
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 42pt;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  @media screen and (max-width: 1800px) {
    font-size: 38pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 32pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 22pt;
  }
`;

export const FooterBottomContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

export const Line = styled.div`
  width: 100%;
  background-color: white;
  height: 2px;
`;

export const SecondRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SocialMedia = styled.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 480px) {
    gap: 15px;
  }
`;

export const Image = styled.img`
  cursor: pointer;
  height: 4.5vh;
  width: auto;
  @media screen and (max-width: 800px) {
    height: 3vh;
  }
  @media screen and (max-width: 480px) {
    height: 4vh;
  }

`;
export const ZWZT = styled.img`
  /*cursor: pointer;*/
  height: 6vh;
  width: auto;
  @media screen and (max-width: 800px) {
    height: 4vh;
  }
  @media screen and (max-width: 480px) {
    height: 4.5vh;
  }
`;

export const Gmail = styled.a`
  cursor: pointer;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 18pt;
  font-weight: bolder;
  @media screen and (max-width: 480px) {
    font-size: 16pt;
  }
`;
