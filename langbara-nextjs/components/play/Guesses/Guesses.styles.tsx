import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px 5px;
  @media screen and (max-width: 800px) {
    /* justify-content: flex-start; */
    width: 100%;
    padding: 0;
  }
`;

export const WrapperWrong = styled.div`
  animation: fadeInAnimation ease 1s;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  overflow-x: visible;
  padding: 15px 27.5px 15px 27.5px;
  border: solid 2px rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.6);
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 18pt;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  @media screen and (min-width: 800px) {
    &:hover {
      transform: scale(1.05);
    }
  }
  @media screen and (max-width: 1100px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 600px) {
    font-size: 14pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 12pt;
  }
`;

export const WrapperCorrect = styled(WrapperWrong)`
  animation: fadeInAnimation ease 1s;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  border: solid 2px rgba(255, 255, 255, 0.9);
  color: #cad623;
`;
