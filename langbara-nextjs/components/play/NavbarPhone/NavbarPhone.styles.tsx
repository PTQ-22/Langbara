import styled from "styled-components";

interface Props {
  isMenuOpen: boolean;
}

export const SideMenu = styled.div<Props>`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.2s ease-in;
  width: ${({ isMenuOpen }) => (isMenuOpen ? "60vw" : "0px")};
  display: flex;
  background-color: #10363e;
  z-index: 2;
`;

export const Column = styled.div<Props>`
  display: ${({ isMenuOpen }) => (isMenuOpen ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  padding: 30px 15px 30px 15px;
  animation: fadeInAnimation ease-in 0.2s;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
  gap: 10vh;
`;

export const LinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Wrapper = styled.nav`
  width: 100%;
  padding: 15px 25px 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Hamburger = styled.img<Props>`
  height: 22px;
  width: auto;
  transition: 0.2s ease-in;
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? "0" : "100")};
`;
export const Right = styled.div`
  display: flex;
  gap: 15px;
`;
export const AccountIcon = styled.img`
  height: 22px;
  width: auto;
`;
export const SettingsIcon = styled.img`
  height: 22px;
  width: auto;
`;
export const CloseIcon = styled.img`
  height: 22px;
  padding-left: 10px;
  width: min-content;
`;

export const LoginButtonsWrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`