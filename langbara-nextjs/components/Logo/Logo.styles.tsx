import styled from 'styled-components';

export const LogoHeader = styled.h1`
  font-family: ${({ theme }: any) => theme.font.logo};
  font-weight: 700;
  font-size: 40px;
  color: ${({ theme }: any) => theme.colors.white};
  margin: 18px 0;

  span {
    color: ${({ theme }: any) => theme.colors.yellow};
  }
`;