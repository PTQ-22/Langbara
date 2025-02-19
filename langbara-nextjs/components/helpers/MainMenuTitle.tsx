import Description from "./Description";
import styled from "styled-components";

export const MainMenuTitle = styled.h1`
  font-size: 22pt;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 600;

  @media screen and (max-width: 1800px) {
    font-size: 20pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 18pt;
  }
  @media screen and (max-width: 600px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 14pt;
  }
  li{
    color: red;
    background-color: red;
  }

`;
