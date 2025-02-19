import { FieldError } from "react-hook-form";
import styled from "styled-components";

interface StyledInputProps {
  error: FieldError | undefined;
}

export const StyledTextArea = styled.textarea<StyledInputProps>`
  width: 100%;
  height: 150px;
  resize: none;

  font-family: ${({ theme }: any) => theme.font.inputs};
  font-style: normal;
  font-weight: 400;

  font-size: 16px;
  line-height: 23.44px;
  padding: 12px 10px;
  border-radius: 5.2px;
  border: 2px solid
    ${({ error, theme }) => (error ? theme.colors.red : theme.colors.white)};
  background: none;
  margin: 7px 0;
  &::placeholder {
    color: ${({ theme }: any) => theme.colors.white};
  }
  &:focus {
    outline: none;
  }
`;
