import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90%;
  display: grid;
  gap: 50px;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1.5fr 200px;
  }
`;

export const CalendarColumn = styled.div`
  width: 100%;
  margin: 30px;
`;

export const CalendarWrapper = styled.div`
  width: fit-content;
  color-scheme: none;
  border: 10px solid white;
  border-radius: 5px;
`;

export const ButtonColumnWrapper = styled.div`
  width: 100%;
  button {
    font-size: 30px;
  }
  grid-row: 2 / 3;
  @media (min-width: 800px) {
    grid-row: 1 / 1;
    grid-column: 3 / 3;
  }
`;

interface TaskDotProps {
  isTask?: boolean;
}

export const TaskDot = styled.p<TaskDotProps>`
  background-color: ${({ isTask }) => (isTask ? "lightgreen" : "red")};
  color: ${({ isTask }) => (isTask ? "lightgreen" : "red")};
  border-radius: 5px;
`;
