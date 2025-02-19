import styled from "styled-components";

export const LevelList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
  gap: 20px;
  @media screen and (max-width: 500px) {
    gap: 10px;
  }

  @media screen and (max-width: 420px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }
`
interface Props {
  isSelected: boolean;
}
export const LevelButton = styled.button<Props>`
  outline: none;
  padding: 10px 0px;
  border: ${({isSelected}) =>isSelected ? "solid 2px rgba(255, 255, 255, 0.9)" : "solid 2px rgba(255, 255, 255, 0.3)"};
  color: ${({isSelected}) =>isSelected ? "#cad623" : "rgba(255, 255, 255, 0.6)"};
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 18pt;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  background-color: transparent;
  width: 100%;


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
  @media screen and (min-width: 420px) {
    flex: 1;
  }
`;
