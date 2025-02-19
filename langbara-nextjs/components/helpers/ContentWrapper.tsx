import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  color: white;
  @media screen and (min-width: 800px){
    flex: 1;
    display: flex;
    min-height: 90vh;
  }
`;