import styled from "styled-components";

export const FlexContentDesktop = styled.div`
  width: 100%;
  height: 100%;
  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60px;
  }
`;