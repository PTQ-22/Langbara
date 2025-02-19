import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../../components/FormField/FormField";
import {
  StyledForm,
  YellowButton,
} from "../../styles/register/register.styles";
import { Logo } from "../../components/Logo/Logo";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ForgotAndRememberWrapper,
  InvisibleWrapper,
} from "../../styles/login/login.styles";
import Router from "next/router";
import { setCookie } from "nookies";
import { API_URL } from "../../data/constants";
import { useState } from "react";
import { Wrapper } from "../../styles/admin/login.styles";

const LOGIN_API_ENDPOINT = `${API_URL}/admin/login`;

interface LoginFormValues {
  login: string;
  passwd: string;
  token2FA?: string;
}

const Login = () => {
  const formSchema = yup.object().shape({
    login: yup.string().required("Login jest wymagany!"),
    passwd: yup.string().required("Hasło jest wymagane!"),
  });

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
    userData: LoginFormValues,
    e
  ) => {
    e?.preventDefault();

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
        message: "Nieprawidłowy kod weryfikacyjny!"
      })
    } else if (apiCode === "0") {
      const json = await response.json();
      const adminAuth = json["cookies"]["adminauth"];
      setCookie(null, "adminauth", adminAuth, { path: "/", maxAge: 365 * 24 * 1 });
      Router.push(`/admin?adminauth=${adminAuth}`, "/admin");
    }
  };

  return (
    <Wrapper>
      <h1>Admin Panel</h1>
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
      </StyledForm>
    </Wrapper>
  );
};

export default Login;
