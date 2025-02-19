import styled from "styled-components";

interface Props{
    center: boolean
}

export const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${({center})=> center ? "center": "start"};
  gap: 2.25vh;
  width: 100%;
  @media screen and (max-width: 800px) {
    gap: 30px;
    align-items: center;
  }
  overflow-y: auto;
`;

export const MaxWidthColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25vh;
  width: 90%;
  max-width: 900px;
  @media screen and (max-width: 800px) {
    gap: 20px;
  }
  @media screen and (max-width: 330px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 60pt;
  font-family: "Oswald", sans-serif;
  font-weight: bolder;
  @media screen and (max-width: 600px) {
    font-size: 50pt;
  }
  @media screen and (max-width: 330px) {
    font-size: 40pt;
  }
  @media screen and (max-width: 300px) {
    font-size: 36pt;
  }
`;

export const LongTitle = styled.h1`
  color: white;
  font-size: 60pt;
  font-family: "Oswald", sans-serif;
  font-weight: bolder;
  @media screen and (max-width: 600px) {
    font-size: 50pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 40pt;
  }
  @media screen and (max-width: 400px) {
    font-size: 36pt;
  }
  @media screen and (max-width: 300px) {
    font-size: 32pt;
  }
`;


export const Desc = styled.h2`
  color: white;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Subtitle = styled.h2`
  color: white;
  font-size: 22px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const TextHeader = styled.div`
  border-bottom: 1px solid white;
  width: 100%;
  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: none;
  }
`;
export const InfoGroup = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
  @media screen and (max-width: 650px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Info = styled.div`
  border-radius: 5px;
  background-color: #10363e;
  display: flex;
  gap: 20px;
  padding: 14px 20px;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex: 1;
  }
  @media screen and (max-width: 650px) {
    justify-content: space-between;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const InfoText = styled.h2`
  color: white;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const InfoIcon = styled.img`
  height: 17px;
  width: auto;
`;
