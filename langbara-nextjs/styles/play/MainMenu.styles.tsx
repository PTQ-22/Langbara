import styled from "styled-components";
import { Center } from "../../components/Center/Center.styles";
export const Wrapper = styled.div`
  padding: 20px 25px 20px 25px;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 800px){
    height: 100vh;
    padding: 30px;
  }

  @media screen and (max-width: 400px){
    padding: 10px 20px 10px 20px;
  }
`;
export const Line = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
`;

export const MainMenuPosition = styled(Center)`
  padding: 30px;
`;