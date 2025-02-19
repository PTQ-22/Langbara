import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 20vh;
  margin-bottom: 10vh;
  margin-left: 10vw;
  margin-right: 10vw;
  @media screen and (max-width: 1400px) {
    margin-top: 10vh;
    margin-bottom: 4vh;
  }
`;

export const SmallCardsContent = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1400px) {
    flex-direction: column;
    align-items: center;
    gap: 5vh;
  }
`;
