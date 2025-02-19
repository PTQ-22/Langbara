import styled from "styled-components";
interface Props {
  isError: boolean;
}

export const Wrapper = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.25vh;
`;

export const DefinitionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const DefinitionOutline = styled.div`
  width: 100%;
  border: rgba(255, 255, 255, 0.2);
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 800px) {
    margin-top: 5px;
  }
`;
export const Definition = styled.h2`
  margin: 20px 30px 20px 30px;
  font-size: 24pt;
  font-family: "Roboto", sans-serif;
  color: white;
  font-weight: 500;

  @media screen and (max-width: 1800px) {
    font-size: 22pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 20pt;
  }
  @media screen and (max-width: 600px) {
    font-size: 18pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 16pt;
  }
`;

export const Input = styled.input<Props>`
  transition: ${({ isError }) => (isError ? "0s" : "0.2s ease-in-out")};
  padding: 20px 30px 20px 30px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.1);
  font-weight: 600;
  font-size: 18pt;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 0px 0px 4px 4px;
  color: ${({ isError }) =>
    isError ? "rgb(216, 52, 52)" : "rgba(0, 0, 0, 0.8)"};
  font-family: "Roboto", sans-serif;
  &:focus {
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.5);
  }
  @media screen and (max-width: 1100px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 600px) {
    padding: 14px 30px 14px 30px;
    font-size: 14pt;
  }
`;
