import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  input, textarea {
    color: white;
  }
`;

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 0 15px;
  h1 {
    font-size: 28px;
  }
  @media (min-width: 600px) {
    align-items: center;
    justify-content: space-between;
  }
`;

interface Props {
  isMobile?: boolean;
}

export const ChangeableWrapper = styled.div<Props>`
  display: ${({isMobile}) => isMobile ? "flex" : "none" };
  @media (min-width: 600px) {
    display: ${({isMobile}) => isMobile ? "none" : "flex" };
  }
`

export const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const LogoutButton = styled.div`
  border: 2px solid white;
  border-radius: 5px;
  padding: 10px 20px;
  background: none;
  &:hover {
    transition: 0.5s;
    opacity: 0.5;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  img {
    &:hover {
      transition: 0.5s;
      transform: scale(1.2);
    }
  }
`;
