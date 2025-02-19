import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px 25px 15px 25px;
  display: grid;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  align-items: center;
  transition: 0.3s ease-in-out;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  @media screen and (min-width: 800px) {
    &:hover {
      transform: scale(1.03);
    }
  }
`;

export const FlexOne = styled.div`
  display: flex;
  gap: 6vw;
`;

export const Group = styled.div`
  justify-self: end;
  display: flex;
  gap: 2px;
  align-items: center;
`;
interface JustifyTextProps{
  justify: string;
}
export const Text = styled.h2<JustifyTextProps>`
  justify-self: ${({justify}) => justify};
  @media screen and (max-width: 1100px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 600px) {
    font-size: 14pt;
  }
  @media screen and (max-width: 480px) {
    font-size: 12pt;
  }
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 18pt;
  color: rgba(255, 255, 255, 0.8);
`;

export const IconButton = styled.img`
  justify-self: end;
  width: auto;
  height: 22px;
  @media screen and (max-width: 1100px) {
    height: 20px;
  }
  @media screen and (max-width: 600px) {
    height: 18px;
  }
  @media screen and (max-width: 480px) {
    height: 16px;
  }
`;
export const PointIcon = styled.img`
  height: 18px;
  width: auto;
  opacity: 0.8;
  @media screen and (max-width: 1100px) {
    height: 16px;
  }
  @media screen and (max-width: 600px) {
    height: 14px;
  }
  @media screen and (max-width: 480px) {
    height: 12px;
  }
  z-index: 1;
`;
