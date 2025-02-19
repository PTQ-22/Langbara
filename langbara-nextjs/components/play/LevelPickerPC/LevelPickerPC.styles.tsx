import styled from "styled-components";

export const LevelList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
  @media screen and (min-width: 1200px) {
    justify-content: flex-start;
    gap:20px;
  }
  @media screen and (min-width: 800px) {
    justify-content: flex-start;
    gap:20px;
  }
`
interface Props {
  isSelected: boolean;
}

export const LevelButton = styled.button<Props>`
  cursor: pointer;
  outline: none;
  width: 20%;
  padding: 15px 15px 15px 15px;
  border: ${({isSelected}) =>isSelected ? "solid 2px rgba(255, 255, 255, 0.9)" : "solid 2px rgba(255, 255, 255, 0.3)"};
  color: ${({isSelected}) =>isSelected ? "#cad623" : "rgba(255, 255, 255, 0.6)"};
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 20pt;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  background-color: transparent;
  @media screen and (min-width: 800px) {
    &:hover {
      transform: scale(1.05);
    }
  }
  @media screen and (max-width: 1800px) {
    font-size: 18pt;
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
