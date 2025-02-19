import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100% - 20vw;
  margin: 2vh 10vw 2vh 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SloganFlexDiv = styled.div`
  max-width: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8vh;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1400px) {
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 42pt;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  color: white;
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

export const BigCard = styled.div`
  padding: 60px 60px 60px 60px;
  max-width: 70%;
  border-radius: 30px;
  display: flex;
  background-color: #0a1c1f;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width:850px){
    max-width: 90%;
  }
  @media screen and (max-width:600px){
    max-width: 100%;
    padding: 40px 20px 40px 20px;
  }
`;

export const BlueSpan = styled.span`
  color: #72a1e5;
`;

export const OrangeSpan = styled.span`
  color: #ff7d00;
`;

export const DarkPinkSpan = styled.span`
  color: #976391;
`;
