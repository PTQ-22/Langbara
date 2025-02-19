import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactModal from "react-modal";
import useModal from "../../hooks/useModal";
import { LanguageLevel, setUserCookie } from "../../logic/user-cookies";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_URL } from "../../data/constants";
import { setCookie } from "nookies";
import {
  StyledForm,
  YellowButton,
} from "../../styles/register/register.styles";
import FormSelect, { SelectOption } from "../FormSelect/FormSelect";
import { Center } from "../Center/Center.styles";
import Link from "next/link";
import { CookiesText } from "./LanguageLevelModal.styles.";

interface Props {
  languageLevel: LanguageLevel | null;
  allowClosingWithoutSet: boolean;
}

interface FormValues {
  languageLevel: LanguageLevel;
}

export const LanguageLevelModal = ({
  languageLevel,
  allowClosingWithoutSet,
}: Props) => {
  const { modalIsOpen, closeModal } = useModal(languageLevel === null);

  const handleClose = () => {
    if (allowClosingWithoutSet) {
      closeModal();
    }
  };

  const formSchema = yup.object().shape({
    languageLevel: yup
      .string()
      .required("Wybierz swój poziom języka angielskiego!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues, e) => {
    e?.preventDefault();

    const response = await fetch(`${API_URL}/set-language-level`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        lvl: data.languageLevel,
      }),
    });

    const apiCode = response.headers.get("api-code");

    console.log(apiCode);
    

    if (apiCode === "0") {
      const json = await response.json();
      setCookie(null, "auth", json.cookies.auth, {
        path: "/",
        maxAge: 86409000,
      });
      setUserCookie(json.cookies.auth);
      closeModal();
    }
  };

  const selectOptions: SelectOption[] = [
    {
      value: "0",
      displayedText: "A1",
      selected: languageLevel === 0,
    },
    {
      value: "1",
      displayedText: "A2",
      selected: languageLevel === 1,
    },
    {
      value: "2",
      displayedText: "B1",
      selected: languageLevel === 2 || languageLevel === null,
    },
    {
      value: "3",
      displayedText: "B2",
      selected: languageLevel === 3,
    },
    {
      value: "4",
      displayedText: "C1",
      selected: languageLevel === 4,
    },
    {
      value: "5",
      displayedText: "C2",
      selected: languageLevel === 5,
    },
  ];

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 10000000,
        },
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "5px",
          border: "none",
          width: "350px",
          height: "200px",
          background: "#10363E",
        },
      }}
    >
      <Center>
        <p>Wybierz poziom języka angielskiego!</p>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            {...register("languageLevel", { required: true })}
            options={selectOptions}
          />
          <YellowButton type="submit">Zapisz</YellowButton>
        </StyledForm>
        <CookiesText>
          Klikając &quot;Zapisz&quot; akceptujesz naszą&nbsp;
          <Link href="/files/POLITYKA_PRYWATNOSCI.pdf" passHref>
          <a target="_blank">politykę prywatności</a>
          </Link> i pliki cookies.
        </CookiesText>
      </Center>
    </ReactModal>
  );
};
