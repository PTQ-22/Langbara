import styled from "styled-components";

export const ForgotAndRememberWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 12px;
  font-family: ${({ theme }: any) => theme.font.inputs};
  font-style: normal;
  font-weight: 400;
  margin: 2px;

  div {
    display: flex;
    align-items: center;

    span {
      padding: 0 3px;
    }
  }
`;

export const InvisibleWrapper = styled.div`
  display: none;
`;
