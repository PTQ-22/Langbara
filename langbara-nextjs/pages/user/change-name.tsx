import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { useForm, SubmitHandler } from "react-hook-form";
import { CenterOnTop } from "../../components/Center/Center.styles";
import FormField from "../../components/FormField/FormField";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { API_URL } from "../../data/constants";
import { AccountType, initCookies, setUserCookie } from "../../logic/user-cookies";
import { StyledForm, YellowButton } from "../../styles/register/register.styles";
import { LayoutProps } from "../play";

const API_USER_CHANGE_DISPLAY_NAME_ENDPOINT = `${API_URL}/user/change-display-name`;

interface ChangeDisplayNameFormValue {
  newName: string;
}

const ChangeDisplayName = ({ userName, points }: LayoutProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangeDisplayNameFormValue>({
    mode: "onSubmit",
    defaultValues: {newName: userName}
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ChangeDisplayNameFormValue> = async (
    userData: ChangeDisplayNameFormValue
  ) => {
    const authcookie = parseCookies()["auth"];
    const response = await fetch(
      API_USER_CHANGE_DISPLAY_NAME_ENDPOINT + `?authcookie=${authcookie}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          newDisplayName: userData.newName
        }),
      }
    );
    const apiCode = response.headers.get("api-code");

    if (apiCode === "0") {
      const json = await response.json();

      setUserCookie(json['auth']);

      router.push("/user/account");
    } else if (apiCode === '2000') {
      setError("newName", {
        type: "server",
        message: "Nazwa użytkownika jest zajęta!",
      });
    }else {
      setError("newName", {
        type: "server",
        message: "Coś poszło nie tak!",
      });
    }
  }

  return (
    <MainLayout backTo="/user/account" userName={userName} sideBarIndex={1} points={points}>
      <CenterOnTop>
        <h1>Zmień nazwę</h1>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormField
            {...register("newName", { required: true })}
            placeholder="Nowa nazwa"
            type="text"
            error={errors.newName}
          />
          <YellowButton type="submit">Zapisz</YellowButton>
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

export default ChangeDisplayName;
