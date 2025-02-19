import styled from "styled-components";

interface Props{
  textAlign: string;
}

// TAK TYMCZASOWO STRZELAM WARTOŚCI
const Description = styled.h2<Props>`
  font-size: 22pt;
  text-align: ${({textAlign}) => textAlign};
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  
  
  @media screen and (max-width: 1800px){
    font-size: 20pt;
    max-lines: 2;
  }
  @media screen and (max-width: 1400px) and (min-width: 850px){
    text-align: left;
  }
  @media screen and (max-width: 1100px) {
    font-size: 18pt;
    max-lines: 2;
    -webkit-line-clamp: 2;
  }
  @media screen and (max-width: 600px){
    font-size: 16pt;
  }
  @media screen and (max-width: 480px){
    font-size: 14pt;
    max-lines: 2;
  }
`;

export default Description;
