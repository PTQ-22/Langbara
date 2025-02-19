import styled from "styled-components";

interface Props {
  IsVisible: boolean;
  scrollPosition: number;
}

export const StyledNavBar = styled.nav<Props>`
  z-index:99;
  width: 100%;
  position: fixed;
  left: 0;
  transition: 0.2s;
  top: ${({ scrollPosition }) => (scrollPosition > 100 ? "0px" : "30px")};
  padding: 30px 10vw 30px 10vw;
  transition: 0.5s;
  background-color: ${({ scrollPosition }) =>
    scrollPosition > 175 ? "#00161A" : "transparent"};
  @media screen and (max-width: 1400px) {
    top: 0;
    background-color: ${({ scrollPosition }) =>
      scrollPosition > 0 ? "#00161A" : "transparent"};
  }
  @media screen and (max-width: 1100px) {
    top: 0;
    padding: 25px 35px 25px 35px;
    height: ${({ IsVisible }) => (IsVisible ? "100vh" : "none")};
    background-color: ${({ IsVisible, scrollPosition }) =>
      IsVisible || scrollPosition > 300 ? "#00161A" : "transparent"};
    gap: 5vh;
    li {
      display: ${({ IsVisible }) => (IsVisible ? "flex" : "none")};
    }
  }
  @media screen and (max-width: 480px) {
    top: 0;
    background-color: ${({ IsVisible, scrollPosition }) =>
      IsVisible || scrollPosition > 10 ? "#00161A" : "transparent"};
  }
`;

export const NavBarList = styled.ul`
  list-style: none;
  display: flex;
  height: 100%;
  align-items: center;
  gap: 5vw;
  transition: 0.5s;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5vh;
  }

  li a {
    cursor: pointer;
    font-size: 26px;
    color: white;
    font-family: "Roboto";
    font-weight: bolder;
  }
`;

export const Hamburger = styled.img`
  @media screen and (max-width: 1100px) {
    display: block;
  }
  display: none;
  height: 30px;
  width: auto;
  cursor: pointer;
`;

