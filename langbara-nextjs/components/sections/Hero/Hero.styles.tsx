import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15vh 12vw 0vh 12vw;
  @media screen and (max-width: 600px) {
    padding: 10vh 12vw 0vh 12vw;
  }
`;

export const LangBaraTitle = styled.h1`
  color: white;
  font-size: 80pt;
  font-family: "Oswald", sans-serif;
  font-weight: bolder;
  @media screen and (max-width: 600px) {
    font-size: 60pt;
    max-lines: 2;
  }
  @media screen and (max-width: 480px) {
    font-size: 48pt;
    max-lines: 2;
  }
`;

export const HeroFlex = styled.div`
  display: flex;
  gap: 20px;
`;

export const ColumnOne = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  @media screen and (max-width: 1400px) {
    width: 100%;
    justify-content: center;
  }
  @media screen and (max-width: 850px) {
    align-items: center;
  }
  
`;

export const ColumnTwo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 50%;
  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

export const TimerWrapper = styled.div`
  width: 80%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeroButtons = styled.div`
  margin-top: 1vh;
  display: flex;
  gap: 1vw;
  width: 100%;
  @media screen and (max-width: 1400px) {
    gap: 1.5vw;
  }
  @media screen and (max-width: 1000px) {
    gap: 2vw;
  }
  @media screen and (max-width: 850px) {
    justify-content: center;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 1.5vh;
    button {
      font-size: 18pt;
    }
  }
`;

export const LimonSpan = styled.span`
  color: #b4c52a;
`;
