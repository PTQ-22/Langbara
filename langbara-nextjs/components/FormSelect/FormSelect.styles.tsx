import { FieldError } from "react-hook-form";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;
  flex: 1;
`;

interface StyledInputProps {
  error: FieldError | undefined;
}

export const StyledSelect = styled.select<StyledInputProps>`
  width: 100%;

  font-family: ${({ theme }: any) => theme.font.inputs};
  font-style: normal;
  font-weight: 400;
  color: white;

  font-size: 16px;
  line-height: 23.44px;
  padding: 12px 10px;
  border-radius: 5.2px;
  border: 2px solid ${({ error, theme }) => (error ? theme.colors.red : theme.colors.white)};
  background: none;
  margin: 7px 0;
  &::placeholder {
    color: ${({ theme }: any) => theme.colors.white};
  }
  &:focus {
    outline: none;
  }
`;

export const StyledOption = styled.option`
  background-color: ${({ theme }: any) => theme.colors.darkGreen};
  color: white;
`

export const ErrorMessage = styled.div`
  color: ${({ theme }: any) => theme.colors.red};
  padding: 0px 18px 8px 18px;
  width: 100%;
  font-size: 14px;
  text-align: start;
`;

export const StyledLabel = styled.label`
  font-size: 20px;
  margin: 2px 10px;
`