import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
`;

export const YellowButton = styled.button`
  width: 100%;
  font-family: ${({ theme }: any) => theme.font.inputs};
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  background: ${({ theme }: any) => theme.colors.yellow};

  color: ${({ theme }: any) => theme.colors.loginGreen};
  border: none;
  border-radius: 3.11327px;
  padding: 7px;
  margin: 15px 0;
  &:hover {
    transition: 0.5s;
    opacity: 0.5;
  }
`;

export const RedButton = styled(YellowButton)`
  background: ${({ theme }: any) => theme.colors.red};
  color: ${({ theme }: any) => theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`;

export const GreenButton = styled.button`
  width: 100%;
  font-family: ${({ theme }: any) => theme.font.inputs};
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  background: none;
  color: ${({ theme }: any) => theme.colors.white};
  border: 2px solid ${({ theme }: any) => theme.colors.white};
  border-radius: 3.11327px;
  padding: 7px;

  &:hover {
    transition: 0.5s;
    opacity: 0.5;
  }
`;

export const ShowPasswordImageWrapper = styled.div`
  position: absolute;
  top: 37%;
  right: 10px;
`;
