import Link from "next/link";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  padding: 8px 17px;
  outline: none;
  border-radius: 5px;
  border: solid 2px white;
  background-color: transparent;
  @media screen and (max-width: 1800px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

interface Props {
  text: string;
  href?: string;
}

const WhiteBorderButton = ({ text, href }: Props) => {
  return href ? (
    <Link href={href}>
      <StyledButton>{text}</StyledButton>
    </Link>
  ) : (
    <StyledButton>{text}</StyledButton>
  );
};

export default WhiteBorderButton;
