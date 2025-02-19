import styled from "styled-components";

interface Props {
  float: string;
}

interface Props2 {
  targetNumber: number;
}

export const Wrapper = styled.div<Props>`
  margin-top: 10vh;
  margin-bottom: 5vh;
  display: flex;
  justify-content: ${({ float }) =>
    float === "left" ? "flex-start" : "flex-end"};
  @media screen and (max-width: 1400px){
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const CirclesDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const Image = styled.img`
  width: 25vw;
  height: auto;
  user-select: none;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  &:hover {
    width: 27vw;
  }
  @media screen and (max-width: 1400px){
    display: none;
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BigCard = styled.div<Props2>`
  padding: 4vh 3vw 4vh 3vw;
  width: 60%;
  border-radius: 50px;
  display: flex;
  background-color: ${({ targetNumber }) =>
    targetNumber === 1
      ? "#9792E3"
      : targetNumber === 2
      ? "#B4C52A"
      : "#FB4D3D"};
  flex-direction: column;
  gap: 2vh;
  /*align-items: center;*/
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  &:hover {
    -webkit-transform: scale(1.05);
  }
  @media screen and (max-width: 2000px){
    width: 70%;
  }
  @media screen and (max-width: 1500px){
    width: 75%;
  }
  @media screen and (max-width: 1400px){
    padding: 4vh 10vw 4vh 10vw;
    width: 100%;
    border-radius: 0px;
    pointer-events:none;
  }
`;

export const SubTitle = styled.h1`
  color: #0f2b30;
  font-size: 42pt;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  padding-bottom: 20px;
  @media screen and (max-width: 1800px){
    font-size: 38pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 32pt;
    max-lines: 2;
    -webkit-line-clamp: 2;
  }
  @media screen and (max-width: 480px) {
    font-size: 22pt;
  }
`;

export const Description = styled.h2`
  font-size: 22pt;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  color: #102c30;
  @media screen and (max-width: 1800px){
    font-size: 20pt;
    max-lines: 2;
  }
  @media screen and (max-width: 1100px) {
    font-size: 18pt;
    max-lines: 2;
    -webkit-line-clamp: 2;
  }
  @media screen and (max-width: 600px){
    font-size: 16pt;
  }
  @media screen and (max-width: 480px){
    font-size: 14pt;
    max-lines: 2;
  }
`;
