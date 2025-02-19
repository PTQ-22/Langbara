import styled from "styled-components";

export const Wrapper = styled.nav`
  width: 55px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #10363e;
  border-radius: 5px;
  flex-direction: column;

  @media screen and (max-width: 799px){
    display: none;
  }
`;
export const Hamburger = styled.img`
  height: 22px;
  transition: 0.2s ease-in;
  opacity: "100";

  &:hover {
    cursor: pointer;
  }
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 10px;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 15px;
  align-items: center;
`;