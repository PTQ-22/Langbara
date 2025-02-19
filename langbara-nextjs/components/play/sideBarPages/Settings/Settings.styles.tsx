import styled from "styled-components";

export const Wrapper = styled.div`
  height: 80vh;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  text-align: center;

  @media screen and (min-width: 800px) {
    height: 100%;
    text-align: left;
  }
  p {
    font-size: small;
  }
`;

export const ButtonContainer = styled.div`
  width: 320px;
`