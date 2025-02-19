import { NextPageContext } from "next";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../components/FormField/FormField";
import {
  StyledForm,
  YellowButton,
  GreenButton,
  Wrapper,
} from "../styles/register/register.styles";
import { Logo } from "../components/Logo/Logo";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ForgotAndRememberWrapper,
  InvisibleWrapper,
} from "../styles/login/login.styles";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { API_URL } from "../data/constants";
import { useState } from "react";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { initCookies, AccountType, setUserCookie } from "../logic/user-cookies";
import { LayoutProps } from "./play";

const LOGIN_API_ENDPOINT = `${API_URL}/login`;

interface LoginFormValues {
  login: string;
  passwd: string;
  token2FA?: string;
}

const Login = ({ points }: LayoutProps) => {
  const formSchema = yup.object().shape({
    login: yup.string().required("Login jest wymagany!"),
    passwd: yup.string().required("Hasło jest wymagane!"),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const [is2FA, setIs2FA] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormValues> = async (
    userData: LoginFormValues
  ) => {
    const response = await fetch(LOGIN_API_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        login: userData.login,
        passwd: userData.passwd,
        token2FA: userData.token2FA,
      }),
    });

    const apiCode = response.headers.get("api-code");
    if (apiCode === "4000" || apiCode === "4001") {
      setError("login", {
        type: "server",
        message: "",
      });
      setError("passwd", {
        type: "server",
        message: "Nieprawidłowy login lub hasło!",
      });
    } else if (apiCode === "4002") {
      setIs2FA(true);
    } else if (apiCode === "4003") {
      setError("token2FA", {
        type: "server",
        message: "Nieprawidłowy kod weryfikacyjny!",
      });
    } else if (apiCode === "0") {
      const json = await response.json();

      setCookie(null, "auth", json["auth"], { path: "/", maxAge: 86409000 });
      setUserCookie(json['auth']);

      router.replace("/");
    }
  };

  return (
    <MainLayout backTo="/play" points={points}>
      <Wrapper>
        <Logo />
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {is2FA ? (
            <>
              <InvisibleWrapper>
                <FormField
                  {...register("login", { required: true })}
                  placeholder="Nazwa użytkownika"
                  error={errors.login}
                />
                <FormField
                  {...register("passwd")}
                  placeholder="Hasło"
                  type="password"
                  error={errors.passwd}
                />
              </InvisibleWrapper>
              <h2>Weryfikacja dwuetapowa</h2>
              <FormField
                {...register("token2FA", { required: true })}
                placeholder="Kod weryfikacyjny"
                type="number"
                error={errors.token2FA}
              />
            </>
          ) : (
            <>
              <FormField
                {...register("login", { required: true })}
                placeholder="Nazwa użytkownika"
                error={errors.login}
              />
              <FormField
                {...register("passwd")}
                placeholder="Hasło"
                type="password"
                error={errors.passwd}
              />
              {/* <ForgotAndRememberWrapper>
                <div>Zapomniałeś hasła?</div>
              </ForgotAndRememberWrapper> */}
            </>
          )}
          <YellowButton type="submit">Zaloguj</YellowButton>

          {is2FA ? null : (
            <Link href="/register">
              <GreenButton type="button">Rejestracja</GreenButton>
            </Link>
          )}
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

  return {
    props: {
      points: userData.points
    },
  };
}

export default Login;
