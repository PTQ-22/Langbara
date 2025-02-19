import { NextPageContext } from "next";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { getAdminData } from "../../logic/admin-cookies";
import { API_URL } from "../../data/constants";
import { Wrapper } from "../../styles/admin/2fa.styles";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ChangePasswordFormValues } from "../../types/changePasswordFromValues";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";

const API_ADMIN_PASSWORD_ENDPOINT = `${API_URL}/admin/change-password`;

interface ChangeAdminPasswordProps {
  adminName: string;
}

const ChangeAdminPassword = ({ adminName }: ChangeAdminPasswordProps) => {
  const router = useRouter();

  const onSubmitBackendCall = async (userData: ChangePasswordFormValues) => {
    const authCookie = parseCookies()["adminauth"];
    return await fetch(
      API_ADMIN_PASSWORD_ENDPOINT + `?authcookie=${authCookie}`,
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
    router.push("/admin");
  };

  return (
    <AdminLayout adminName={adminName} header={"Zmień hasło"}>
      <Wrapper>
        <ChangePasswordForm
          onSubmitBackendResponse={onSubmitBackendCall}
          onSuccessBackendResponse={onSucess}
        />
      </Wrapper>
    </AdminLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const admin = await getAdminData(ctx);
  if (!admin.isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
    };
  }
  return {
    props: {
      adminName: admin.name,
    },
  };
}

export default ChangeAdminPassword;
