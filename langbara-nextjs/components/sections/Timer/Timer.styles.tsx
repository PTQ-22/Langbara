import styled from "styled-components";

export const Wrapper = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  border: 0.75vw solid #B4C52A;
  border-radius: 1.5vw;
  padding: 1.2vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const NumbersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 7vw;
  flex: 1;
  margin: 0 5px;
`

export const BoldNumber = styled.span`
  font-family: "work-sans", sans-serif;
  font-weight: 900;
  font-size: 60pt;
  @media screen and (max-width: 1800px) {
    font-size: 53pt;
  }
`;

export const TimerText = styled.span`
  font-family: "work-sans", sans-serif;
  font-weight: 900;
  font-size: 16pt;
  @media screen and (max-width: 1800px) {
    font-size: 17pt;
  }
`;
