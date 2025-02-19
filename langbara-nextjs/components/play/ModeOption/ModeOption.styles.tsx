import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const Mode = styled.div<Props>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 15px;
  border-radius: 4px;
  background-color: #10363E;
  border: ${({ isSelected }) =>isSelected ? "solid 4px #cad623" : " none"};
  padding: ${({ isSelected }) => isSelected ? "20px 25px 45px 25px" : "24px 29px 49px 29px;"};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 25px;
  justify-content: space-between;
`;

export const ModeTitle = styled.h1`
  font-family: "Oswald";
  font-weight: bold;
  color: white;
  span {
    color: #cad623;
  }
  font-size: 30pt;
  @media screen and (max-width: 1800px) {
    font-size: 28pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 26pt;
  }
  @media screen and (max-width: 600px) {
    font-size: 24pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 22pt;
  }
`;

export const ModeDescription = styled.h2`
  font-size: 22pt;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 600;

  @media screen and (max-width: 1800px) {
    font-size: 20pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 18pt;
  }
  @media screen and (max-width: 600px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 14pt;
  }
`;

export const CustomDot = styled.div`
  margin-top: 10px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin: 0;
  padding: 0;
`;
export const CustomDotActive = styled.div`
  margin-top: 10px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #cad623;
  margin: 0;
  padding: 0;
`;
export const DotList = styled.ul`
  position: static;
  display: flex;
  bottom: auto;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 0;
  border-radius: 0px 0px 4px 4px;
`;
