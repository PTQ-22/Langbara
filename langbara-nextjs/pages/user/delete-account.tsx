import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useForm, SubmitHandler } from "react-hook-form";
import { CenterOnTop } from "../../components/Center/Center.styles";
import FormField from "../../components/FormField/FormField";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { API_URL } from "../../data/constants";
import { AccountType, initCookies } from "../../logic/user-cookies";
import { RedButton, StyledForm } from "../../styles/register/register.styles";
import { LayoutProps } from "../play";

const API_DELETE_ACCOUNT_ENDPOINT = `${API_URL}/user/`;

interface DeleteAccountFormValue {
  password: string;
}

const DeleteAccount = ({ userName, points }: LayoutProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DeleteAccountFormValue>({
    mode: "onSubmit",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<DeleteAccountFormValue> = async (
    userData: DeleteAccountFormValue
  ) => {
    const authcookie = parseCookies()["auth"];
    const response = await fetch(
      API_DELETE_ACCOUNT_ENDPOINT + `?authcookie=${authcookie}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: userData.password,
        }),
      }
    );
    const apiCode = response.headers.get("api-code");

    if (apiCode === "1001") {
      setError("password", {
        type: "server",
        message: "Za długie hasło!",
      });
    } else if (apiCode === "5001") {
      setError("password", {
        type: "server",
        message: "Niepoprawne hasło!",
      });
    } else if (apiCode === "0") {
      router.push("/logout");
    } else {
      setError("password", {
        type: "server",
        message: "Coś poszło nie tak!",
      });
    }
  };

  return (
    <MainLayout backTo="/user/account" userName={userName} sideBarIndex={1} points={points}>
      <CenterOnTop>
        <h1>Czy na pewno chcesz usunąć konto?</h1>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormField
            {...register("password", { required: true })}
            placeholder="Potwierdź hasłem"
            type="password"
            error={errors.password}
          />
          <RedButton type="submit">Usuń konto</RedButton>
        </StyledForm>
      </CenterOnTop>
    </MainLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  if (userData.account_type === AccountType.UNREGISTERED) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      userName: userData.registered.display_name,
      points: userData.points
    },
  };
}

export default DeleteAccount;
