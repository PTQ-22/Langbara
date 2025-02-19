import React from "react";
import { FieldError } from "react-hook-form";
import { ErrorMessage, StyledLabel, Wrapper } from "../FormField/FormField.styles";
import { StyledTextArea } from "./FormTextArea.styles";

interface Props {
  label?: string;
  value?: string;
  error?: FieldError;
  errorMessage?: string;
  name?: string;
}

const FormTextArea = (
  { label, value, error, ...props }: Props,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) => {
  
  return (
    <>
      <Wrapper>
          <>
            <StyledLabel htmlFor={props.name}>{label}</StyledLabel>
            <StyledTextArea
              id={props.name}
              error={error}
              value={value}
              ref={ref}
              {...props}
            />
          </>
      </Wrapper>
      {error && error.message ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : null}
    </>
  );
};

export default React.forwardRef(FormTextArea);
