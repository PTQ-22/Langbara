import styled from "styled-components";

export const PaginateWrapper = styled.div`
  ul {
    display: flex;
    list-style-type: none;
    margin: 5px;
    li {
      background-color: #0f292d;
      border: 1px solid white;
      &:hover {
        background-color: #cad623;
      }
      a {
        user-select: none;
        padding: 10px;
      }
    }
  }
`;

export const StyledCheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  margin: 5px;
`;