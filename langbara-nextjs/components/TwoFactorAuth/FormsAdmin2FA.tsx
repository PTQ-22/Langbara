import Router from "next/router";
import { parseCookies } from "nookies";
import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  StyledForm,
  YellowButton,
} from "../../styles/register/register.styles";
import FormField from "../FormField/FormField";
import Button from "../helpers/Button";
import { AccountType2FA } from "./TwoFactorAuth";

interface TokenFormValue {
  sixDigitCode: number;
}

interface Props {
  accountID: string;
  accountType: AccountType2FA;
  ENDPOINT_URL: string;
  setSecret: Dispatch<SetStateAction<string>>;
}

export const Enable2FAForm = ({
  accountID,
  ENDPOINT_URL,
  accountType,
  setSecret,
}: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TokenFormValue>();

  const cookies = parseCookies();

  const onSubmit: SubmitHandler<TokenFormValue> = async (
    data: TokenFormValue
  ) => {
    const bodyObj =
      accountType === AccountType2FA.ADMIN
        ? { name: accountID, token: data.sixDigitCode }
        : { uid: accountID, token: data.sixDigitCode };
    const response = await fetch(ENDPOINT_URL + `/verify?authcookie=${cookies.auth || 'dupa'}&adminauth=${cookies.adminauth || 'dupa'}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyObj),
    });
    const respData = await response.json();
    if (respData.verified === true) {
      setSecret("");
      Router.reload();
    } else {
      setError("sixDigitCode", { message: "Niepoprawny kod!" });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormField
        {...register("sixDigitCode", {
          required: true,
        })}
        error={errors.sixDigitCode}
        placeholder="Kod weryfikacyjny"
        type="number"
      />
      <YellowButton type="submit">Włącz weryfikację dwuetapową</YellowButton>
    </StyledForm>
  );
};

interface PasswordFormValue {
  password: string;
}

interface Propss {
  accountID: string;
  accountType: AccountType2FA;
  ENDPOINT_URL: string;
  setDisabling2FA: Dispatch<SetStateAction<boolean>>;
}

export const Disable2FAForm = ({
  accountID,
  accountType,
  ENDPOINT_URL,
  setDisabling2FA,
}: Propss) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordFormValue>();

  const onSubmit: SubmitHandler<PasswordFormValue> = async (
    data: PasswordFormValue,
    e
  ) => {
    e?.preventDefault();
    const bodyObj =
      accountType === AccountType2FA.ADMIN
        ? { name: accountID, password: data.password }
        : { uid: accountID, password: data.password };
    const response = await fetch(ENDPOINT_URL + "/disable", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyObj),
    });

    const apiCode = response.headers.get("api-code");

    if (apiCode === "4000" || apiCode === "4001") {
      setError("password", {
        type: "server",
        message: "Nieprawidłowe hasło!",
      });
    } else if (apiCode === "0") {
      setDisabling2FA(false);
      Router.reload();
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormField
        {...register("password", {
          required: true,
        })}
        error={errors.password}
        placeholder="Potwierdź hasłem"
        type="password"
      />
      <Button color="rgba(255,255,255" type="submit">
        Wyłącz
      </Button>
    </StyledForm>
  );
};
