import styled from "styled-components";

export const Challenge = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  background-color: #19525f;
  border-radius: 8px;
`;

export const ChallengeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

export const ChallengeContent = styled.h1`
  font-size: 22px;
  color: white;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ChallengeStatus = styled.h2`
  font-size: 16px;
  color: white;
  font-weight: 500;
  opacity: 0.6;
  font-family: "Roboto", sans-serif;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MaxValBar = styled.div`
  width: 100%;
  background-color: white;
  opacity: 0.9;
  border-radius: 4px;
  height: 20px;
`;

interface Props {
  percent: number;
}

export const ValBar = styled.div<Props>`
  width: ${({ percent }) => `${percent}%`};
  background: repeating-linear-gradient(
    -45deg,
    #6d8630 0px,
    #6d8630 10px,
    #9ca526 10px,
    #9ca526 20px
  );
  opacity: 0.9;
  border-radius: 4px 0px 0px 4px;
  height: 20px;
`;
