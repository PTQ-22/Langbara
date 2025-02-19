import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import styled from "styled-components";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import DesktopLayout from "../../components/DesktopLayout/DesktopLayout";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import PhoneLayout from "../../components/PhoneLayout/PhoneLayout";
import { API_URL } from "../../data/constants";
import { AccountType, initCookies } from "../../logic/user-cookies";
import { Wrapper } from "../../styles/register/register.styles";
import { ChangePasswordFormValues } from "../../types/changePasswordFromValues";
import { LayoutProps } from "../play";

const API_USER_PASSWORD_ENDPOINT = `${API_URL}/user/change-password`;

const ChangePasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const ChangeUserPassword = ({userName, points}: LayoutProps) => {
  const router = useRouter();

  const onSubmitBackendCall = async (userData: ChangePasswordFormValues) => {
    const authcookie = parseCookies()["auth"];
    return await fetch(
      API_USER_PASSWORD_ENDPOINT + `?authcookie=${authcookie}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          oldPassword: userData.oldPassword,
          newPassword: userData.newPassword,
        }),
      }
    );
  };

  const onSucess = () => {
    router.push("/user/account");
  };

  return (
    <MainLayout
      backTo="/user/account"
      userName={userName}
      points={points}
      sideBarIndex={1}
    >
      <ChangePasswordWrapper>
        <h1>Zmień hasło</h1>
        <ChangePasswordForm
          onSubmitBackendResponse={onSubmitBackendCall}
          onSuccessBackendResponse={onSucess}
        />
      </ChangePasswordWrapper>
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

export default ChangeUserPassword;
