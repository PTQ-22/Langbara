import styled from "styled-components";
interface Props {
  height: number;
}

export const MainWrapper = styled.div<Props>`
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  @supports (-webkit-touch-callout: none) {
    height: ${({ height }) => height+0.5 + "px"};
  }
  height: 100vh;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  margin: 0px 20px 0px 20px;
  @media screen and (max-width: 800px) {
    gap: 5vh;
  }
`;

export const Title = styled.h1`
  font-size: 56pt;
  z-index: 100;
  color: white;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-size: 42pt;
  }
  @media screen and (max-width: 800px) {
    font-size: 36pt;
  }
  @media screen and (max-width: 620px) {
    font-size: 28pt;
  }
  @media screen and (max-width: 500px) {
    font-size: 24pt;
  }
  @media screen and (max-width: 430px) {
    font-size: 22pt;
  }
  @media screen and (max-width: 400px) {
    font-size: 20pt;
  }
  @media screen and (max-width: 360px) {
    font-size: 18pt;
  }
`;

export const Grid = styled.div`
  z-index: 11;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 2vh;
    width: 80%;
  }
`;

export const CirclePurple = styled.img`
  pointer-events: none;
  opacity: 0.8;
  width: 23vw;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;
export const CircleLightBlueLeft = styled.img`
  pointer-events: none;
  opacity: 0.8;
  width: 23vw;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;
export const CircleLightBlueRight = styled.img`
  pointer-events: none;
  opacity: 0.8;
  width: 23vw;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const CircleOrange = styled.img`
  pointer-events: none;
  opacity: 0.8;
  width: 23vw;
  height: auto;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;
