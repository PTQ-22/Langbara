import styled from "styled-components";

// TAK TYMCZASOWO STRZELAM WARTOŚCI
const Header = styled.h1`
  font-size: 42pt;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  @media screen and (max-width: 1800px){
    font-size: 38pt;
  }
  @media screen and (max-width: 1100px) {
    font-size: 32pt;
    max-lines: 2;
    -webkit-line-clamp: 2;
  }
  @media screen and (max-width: 480px) {
    font-size: 22pt;
    max-lines: 2;
    -webkit-line-clamp: 2;
  }
  
`;

export default Header;
