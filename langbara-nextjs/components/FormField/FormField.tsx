import React, { useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import {
  ErrorMessage,
  StyledInput,
  StyledLabel,
  Wrapper,
} from "./FormField.styles";
import Image from "next/image";
import { ShowPasswordImageWrapper } from "../../styles/register/register.styles";

interface Props {
  label?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  errorMessage?: string;
  name?: string;
  maxLength?: number;
  autoComplete?: string;
}

const FormField = (
  {
    label,
    value,
    placeholder,
    type = "text",
    autoComplete = "on",
    error,
    maxLength,
    ...props
  }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [iconPath, setIconPath] = useState<string>("/assets/password_icon.svg");

  const handleShowClick = () => {
    if (isPasswordShown) {
      setIconPath("/assets/password_icon.svg");
    } else {
      setIconPath("/assets/password_eye.svg");
    }
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <>
      <Wrapper>
        {type == "password" ? (
          <>
            <ShowPasswordImageWrapper>
              <Image
                onClick={handleShowClick}
                src={iconPath}
                height={20}
                width={20}
                alt={isPasswordShown ? "ukryj hasło" : "pokaż hasło"}
              />
            </ShowPasswordImageWrapper>{" "}
            <StyledLabel htmlFor={props.name}>{label}</StyledLabel>
            <StyledInput
              id={props.name}
              error={error}
              placeholder={placeholder}
              type={isPasswordShown ? "text" : "password"}
              value={value}
              {...props}
              ref={ref}
              maxLength={maxLength}
              autoComplete={autoComplete}
            />{" "}
          </>
        ) : (
          <>
            <StyledLabel htmlFor={props.name}>{label}</StyledLabel>
            <StyledInput
              id={props.name}
              error={error}
              placeholder={placeholder}
              type={type}
              value={value}
              {...props}
              ref={ref}
              maxLength={maxLength}
              autoComplete={autoComplete}
            />
          </>
        )}
      </Wrapper>
      {error && error.message ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : null}
    </>
  );
};

export default React.forwardRef(FormField);
