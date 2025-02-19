import styled from "styled-components";

export const StyledPlayerWrapper = styled.div`
  padding: 15px 25px 15px 25px;
  display: flex;
  width: 90%;
  max-width: 500px;
  /* background-color: rgba(255, 255, 255, 0.04); */
  background-color: #10363E;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s ease-in-out;
  @media screen and (min-width: 800px) {
    width: 600px;
    &:hover {
      transform: scale(1.03);
    }
  }
`;

export const Group = styled.div`
  width: 30px;
  display: flex;
  gap: 3px;
  justify-content: flex-end;
  align-items: center;
`;

export const PlaceWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
`;