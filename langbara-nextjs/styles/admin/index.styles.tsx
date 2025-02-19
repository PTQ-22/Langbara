import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  margin: 60px;
`;

export const StyledCard = styled.div`
  border: 3px solid white;
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s;
  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.05);
  }

  p {
    padding-top: 10px;
  }

`;
