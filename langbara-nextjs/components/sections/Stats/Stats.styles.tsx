import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 2vh 0 0 0;
  padding: 10vh 10vw 10vh 10vw;
  background-color: #05272d;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1100px){
    padding: 7vh 10vw 7vh 10vw;
  }
  @media screen and (max-width: 900px){
    padding: 7vh 8vw 7vh 8vw;
  }
  @media screen and (max-width: 800px){
    padding: 7vh 9vw 7vh 10vw;
  }
  @media screen and (max-width: 480px){
    padding: 8vh 9vw 8vh 10vw;
  }
`;
export const StatsContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10vh;
  @media screen and (max-width: 1100px){
    gap: 6vh;
  }
  
`;

export const StatsTitle = styled.h1`
  font-size: 42pt;
  color: white;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  @media screen and (max-width: 1800px){
    font-size: 38pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 32pt;
    max-lines: 2;
    -webkit-line-clamp: 2;
  }
  @media screen and (max-width: 850px) {
    text-align: center;
    font-size: 28pt;
    max-lines: 2;
    -webkit-line-clamp: 2;
  }
  @media screen and (max-width: 480px){
    font-size: 22pt;
  }
`;
export const StatsInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 800px){
    flex-direction: column;
    gap: 5vh;
  }
  @media screen and (max-width: 480px){
    gap: 8vh;
  }
`;

export const StatsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  text-align: center;
  @media screen and (max-width: 1100px){
    gap: 1vh;
  }
`;

export const StatsText = styled.h2`
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 32pt;
  @media screen and (max-width: 1800px) {
    font-size: 28pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 22pt;
  }
  @media screen and (max-width: 850px) {
    font-size: 20pt;
  }
  @media screen and (max-width: 800px) {
    font-size: 25pt;
  }
  @media screen and (max-width: 480px){
    font-size: 18pt;
  }
`;

export const StatsNumberNoFont = styled.h2`
  font-weight: 900;
  font-size: 42pt;
  @media screen and (max-width: 1800px) {
    font-size: 38pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 32pt;
  }
  @media screen and (max-width: 900px) {
    font-size: 30pt;
  }
  @media screen and (max-width: 800px){
    font-size: 35pt;
  }
  @media screen and (max-width: 480px){
    font-size: 22pt;
  }
`;

export const StatsNumber = styled(StatsNumberNoFont)`
  font-family: "work-sans", sans-serif;
`

export const One = styled.span`
  color: #3071e8;
`;
export const Two = styled.span`
  color: #9792e3;
`;
export const Three = styled.span`
  color: #1f7ea7;
`;
