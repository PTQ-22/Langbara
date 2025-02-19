import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import {
  ErrorMessage,
  StyledSelect,
  StyledLabel,
  Wrapper,
  StyledOption,
} from "./FormSelect.styles";

export interface SelectOption {
  value: string;
  displayedText?: string;
  selected?: boolean;
}

interface Props {
  label?: string;
  error?: FieldError;
  errorMessage?: string;
  name?: string;
  options: SelectOption[];
}

const FormSelect = (
  { label, error, ...props }: Props,
  ref: React.ForwardedRef<HTMLSelectElement>
) => {
  return (
    <>
      <Wrapper>
        <StyledLabel htmlFor={props.name}>{label}</StyledLabel>
        <StyledSelect id={props.name} error={error} {...props} ref={ref}>
          {props.options.map((option: SelectOption) => (
            <StyledOption
              key={option.value}
              value={option.value}
              selected={option.selected}
            >
              {option.displayedText || option.value}
            </StyledOption>
          ))}
        </StyledSelect>
      </Wrapper>
      {error && error.message ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : null}
    </>
  );
};

export default React.forwardRef(FormSelect);
