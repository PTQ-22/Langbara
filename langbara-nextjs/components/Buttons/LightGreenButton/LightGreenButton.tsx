import Link from "next/link";
import { FunctionComponent } from "react";
import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 14pt;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px 10px 20px;
  border: none;
  outline: none;
  border-radius: 4px;
  /* width: min-content; */
  background-color: rgba(202, 214, 35, 0.5);
`;

interface LightGreenButtonProps {
  text: string;
  href?: string;
}

const LightGreenButton: FunctionComponent<LightGreenButtonProps> = ({
  text,
  href,
}) => {
  return href ? (
    <Link href={href}>
      <StyledButton>{text}</StyledButton>
    </Link>
  ) : (
    <StyledButton>{text}</StyledButton>
  );
};

export default LightGreenButton;
