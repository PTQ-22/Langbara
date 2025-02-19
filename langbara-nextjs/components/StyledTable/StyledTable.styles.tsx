import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 10px 0 0  0;
  width: 95%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  padding: 10px;
  width: 100%;
  font-size: 10px;
  border-collapse:separate; 
  border-spacing: 0 1em;
  overflow: auto;
  th, td {
    border: none;
    padding: 5px;
    text-align: center;
    background-color: #0a2024;
  }

    
  td:first-child,
  th:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  td:last-child,
  th:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media (min-width: 600px) {
    font-size: 20px;
  }
`;