import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px 25px 15px 0px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 799px){
    display: none;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  justify-content: flex-start;
`;

export const Right = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content:flex-end;
  align-items: center;
`;

export const AccountIcon = styled.img`
  align-self: center;
  height: 24px;
  width: auto;
`;

export const SettingsIcon = styled.img`
  align-self: center;
  height: 24px;
  width: auto;
`;

export const LangBaraText = styled.h1`
  color: white;
  font-size: 32px;
  font-family: "Oswald", sans-serif;
  font-weight: bolder;
  @media screen and (max-width: 2400px) {
    font-size: 30px;
  }
  @media screen and (max-width: 1800px) {
    font-size: 28px;
  }
  @media screen and (max-width: 1100px) {
    font-size: 26px;
  }
  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
  @media screen and (max-width: 480px) {
    font-size: 22px;
  }
`;

export const LimonSpan = styled.span`
  color: #b4c52a;
`;
