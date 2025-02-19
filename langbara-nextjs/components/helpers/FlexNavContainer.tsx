import styled from "styled-components";

export const FlexNavContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: fixed;
  z-index: 1; */

  @media screen and (min-width: 800px){
    display: none;
  }
`;