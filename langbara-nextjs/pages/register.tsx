import type { NextPage, NextPageContext } from "next";
import FormField from "../components/FormField/FormField";
import { YellowButton, Wrapper } from "../styles/register/register.styles";
import { StyledForm, GreenButton } from "../styles/register/register.styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccountType, UserCookie, initCookies, setUserCookie } from "../logic/user-cookies";
import { setCookie } from "nookies";
import { API_URL, HCAPTCHA_SITE_KEY } from "../data/constants";
import { Logo } from "../components/Logo/Logo";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { LayoutProps } from "./play";
import Link from "next/link";

const REGISTER_API_ENDPOINT = `${API_URL}/register`;

interface RegisterFormValues {
  displayName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

const Register = ({ points }: LayoutProps) => {
  const formSchema = yup.object().shape({
    displayName: yup.string().required("Nazwa jest wymagana!"),
    email: yup.string().required("Mail jest wymagany!"),
    password: yup.string().required("Hasło jest wymagane!"),
    confirmedPassword: yup
      .string()
      .required("Potwierdzenie hasła jest wymagane!")
      .oneOf([yup.ref("password")], "Hasła się nie zgadzają!"),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const [captchaResponse, setCaptchaResponse] = useState<string>("");

  const onSubmit: SubmitHandler<RegisterFormValues> = async (
    userData: RegisterFormValues
  ) => {
    const response = await fetch(REGISTER_API_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        displayName: userData.displayName,
        email: userData.email,
        password: userData.password,
        captchaResponse,
      }),
    });

    const apiCode = response.headers.get("api-code");
    if (apiCode === "2000") {
      setError("displayName", {
        type: "server",
        message: "Użytkownik o tej nazwie już istnieje!",
      });
    } else if (apiCode === "2001") {
      setError("email", {
        type: "server",
        message: "Użytkownik z tym mailem już istnieje!",
      });
    } else if (apiCode === "2002") {
      setError("displayName", {
        type: "server",
        message: "",
      });
      setError("email", {
        type: "server",
        message: "",
      });
      setError("password", {
        type: "server",
        message: "",
      });
      setError("confirmedPassword", {
        type: "server",
        message: "Wykryto manipulacje ciasteczkami. Skontaktuj się z supportem",
      });
    } else if (apiCode === "0") {
      const json = await response.json();
      setUserCookie(json['auth']);
      router.push("/");
    } else {
      setError("displayName", {
        type: "server",
        message: "",
      });
      setError("email", {
        type: "server",
        message: "",
      });
      setError("password", {
        type: "server",
        message: "",
      });
      setError("confirmedPassword", {
        type: "server",
        message: `Błąd ${apiCode}. Spróbuj ponownie później`,
      });
    }
  };

  return (
    <MainLayout backTo="/play" points={points}>
      <Wrapper>
        <Logo />
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormField
            {...register("displayName", { required: true })}
            placeholder="Nazwa użytkownika"
            error={errors.displayName}
            maxLength={30}
          />
          <FormField
            {...register("email")}
            placeholder="Mail"
            type="email"
            error={errors.email}
            maxLength={255}
          />
          <FormField
            {...register("password")}
            placeholder="Hasło"
            type="password"
            error={errors.password}
            maxLength={255}
          />
          <FormField
            {...register("confirmedPassword")}
            placeholder="Powtórz hasło"
            type="password"
            error={errors.confirmedPassword}
            maxLength={255}
          />
          <HCaptcha sitekey={HCAPTCHA_SITE_KEY} onVerify={setCaptchaResponse} />
          <YellowButton type="submit">Zarejestruj </YellowButton>
          <Link href={'/play'} >
            <GreenButton type="button">Wstecz</GreenButton>
          </Link>
        </StyledForm>
      </Wrapper>
    </MainLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  if (userData.account_type === AccountType.REGISTERED) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: {
    points: userData.points
  } };
}

export default Register;
