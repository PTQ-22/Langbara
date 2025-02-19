import styled from "styled-components";

export const OtherGap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.25vh;
  width: 100%;
  max-width: 750px;
  padding: 0px 25px 20px 25px;

  @media screen and (max-width: 800px) {
    gap: 10px;
    padding: 0px;
  }
`;

export const IconRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const PointRow = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  h1 {
    font-size: 22px;
    color: white;
    font-family: "Roboto", sans-serif;
  }
  img {
    height: 18px;
    width: auto;
  }
`;

interface MainButtonProps {
  disabled?: boolean;
}

export const Icon = styled.img<MainButtonProps>`
  height: 25px;
  width: auto;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainButton = styled.button<MainButtonProps>`
  cursor: pointer;
  padding: 20px 30px 20px 30px;
  background-color: ${(props) => (props.disabled ? "#aaa" : "#b4c52a")};
  color: white;
  border: none;
  outline: none;
  font-size: 18pt;
  font-weight: 600;
  border-radius: 4px;
  width: 100%;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.002);
    box-shadow: 0px 0px 10px 0px #b3c52a7c;
  }
  @media screen and (max-width: 1100px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 600px) {
    padding: 14px 30px 14px 30px;
    font-size: 14pt;
  }
`;

export const Line = styled.div`
  animation: fadeInAnimation ease 1s;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  width: 100%;
  height: 1.5px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
`;

export const NavLine = styled.div`
  animation: fadeInAnimation ease 1s;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  width: 100%;
  height: 1.5px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
`;

export const PaddingLine = styled.div`
  padding: 0px 25px 0px 25px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const WordInfoDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  gap: 10px;
`;

export const ModalWrapper = styled.div`
  padding: 10px 25px 10px 25px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;
  text-align: center;
  align-items: center;
  @media screen and (max-width: 1450px) {
    gap: 40px;
  }
  @media screen and (max-width: 380px) {
    padding: 10px 10px;
    gap: 35px;
  }
`;

export const ModalConfirmationText = styled.h1`
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 500;
  @media screen and (max-width: 1600px) {
    font-size: 22px;
  }
  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }

  @media screen and (max-width: 380px) {
    font-size: 18px;
  }
`;

export const ModalButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 25px;
  @media screen and (max-width: 450px) {
    column-gap: 15px;
  }
`;
interface ModalButtonProps {
  cancel: boolean;
}
export const ModalButton = styled.button<ModalButtonProps>`
  cursor: pointer;
  background-color: ${({ cancel }) => (cancel ? "transparent" : "#b4c52a")};
  border-radius: 5px;
  outline: none;
  border: ${({ cancel }) => (cancel ? "2px solid white" : "none")};
  width: 100%;
  padding: 15px 20px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: white;
  @media screen and (max-width: 1200px) {
    padding: 12.5px 20px;
    font-size: 16px;
  }
  @media screen and (max-width: 450px) {
    padding: 12.5px 10px;
    font-size: 14px;
  }
  @media screen and (max-width: 380px) {
    padding: 10px 10px;
  }
`;
