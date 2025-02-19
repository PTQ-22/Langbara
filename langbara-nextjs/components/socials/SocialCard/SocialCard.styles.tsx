import styled from "styled-components";

interface Props {
  color: string;
  index: number;
}

interface Props2 {
  index: number;
}
export const Wrapper = styled.div<Props>`
  cursor: pointer;
  padding: 40px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4vh;
  width: 375px;
  border-radius: 30px;
  transition: 0.3s ease-in-out;
  background: ${({ color, index }) =>
    `linear-gradient(${
      index % 2 === 0 ? "90deg" : "-90deg"
    }, ${color}) 0%, ${color}, 0.8) 100%)`};
  &:hover{
    -webkit-transform: scale(1.05);
  }
  @media screen and (max-width: 1200px){
    width: 325px;
    gap: 3vh;
  }
  @media screen and (max-width: 800px){
    width: 100%;
    flex-direction: row;
    padding: 20px 40px 20px 40px;
    border-radius: 10px;
    gap: 25px;
  }
  @media screen and (max-width: 480px){
    gap: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
`;

export const Title = styled.h1<Props2>`
  font-size: 22pt;
  color: ${({ index }) => index === 4?`black` : "white"};
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  @media screen and (max-width: 800px){
    font-size: 18pt;
  }
  @media screen and (max-width: 560px){
    font-size: 16pt;
  }
  @media screen and (max-width: 500px){
    font-size: 14pt;
  }
  @media screen and (max-width: 480px){
    display: none;
  }

`;
export const Icon = styled.img<Props2>`
  width: 30px;
  height: 30px;
  fill: ${({ index }) => index === 4?`black` : "white"}; // kurde trzeba to zrobic tu
  @media screen and (max-width: 650px){
    display: none;
  }
`;
export const Button = styled.button<Props>`
  cursor: pointer;
  height: 50px;
  outline: none;
  border: none;
  background-color: ${({ index }) => index === 4?`black` : "white"};
  color: ${({ color }) => `${color})`};
  border-radius: 50px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 18pt;
  width: 100%;
  @media screen and (max-width: 1200px){
    font-size: 16pt;
    height: 45px;
  }
  @media screen and (max-width: 800px){
    font-size: 12pt;
    height: 40px;
  }
  @media screen and (max-width: 560px){
    font-size: 10pt;
    height: 35px;
  }
  @media screen and (max-width: 480px){
    font-size: 12pt;
    height: 40px;
  }
`;
