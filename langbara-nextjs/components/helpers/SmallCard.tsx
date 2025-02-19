import styled from "styled-components";

// TAK TYMCZASOWO STRZELAM WARTOŚCI
const SmallCard = styled.div`
  padding: 50px 50px 50px 50px;
  max-width: 18vw;
  border-radius: 30px;
  display: flex;
  background-color: ${(props) => props.color || "white"};
  flex-direction: column;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  align-items: center;
  gap: 2.5vh;
  justify-content: space-around;
  

  @media screen and (min-width: 800px) {
    &:hover {
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 2100px) {
    max-width: 21vw;
  }
  @media screen and (max-width: 1800px) {
    max-width: 23vw;
  }
  @media screen and (max-width: 1400px) and (min-width: 850px) {
    max-width: 90%;
    align-items: flex-start;
  }
  @media screen and (max-width: 850px) {
    max-width: 80%;
  }
  @media screen and (max-width: 480px) {
    max-width: 100%;
    padding: 30px 40px 30px 40px;

  }
`;

export default SmallCard;
