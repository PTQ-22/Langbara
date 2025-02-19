import styled from "styled-components";

export const Center = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CenterOverlowAuto = styled(Center)`
  overflow-y: auto;
`;

export const CenterOnTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;
