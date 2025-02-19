import styled from "styled-components";

interface Props {
  color: string;
}

const Button = styled.button<Props>`
  cursor: pointer;
  padding: 10px 30px 10px 30px;
  background: ${({ color }) =>
    `linear-gradient(90deg, ${color}) 0%, ${color}, 0.8) 100%)`};
  color: ${({ color }) => (color === "rgba(255,255,255" ? "#18505B" : "white")};
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  border: none;
  outline: none;
  font-size: 32px;
  border-radius: 3px;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  @media screen and (min-width: 600px) {
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default Button;
