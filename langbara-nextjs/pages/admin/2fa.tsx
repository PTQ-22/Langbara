import { NextPageContext } from "next";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { getAdmin2FAData, getAdminData } from "../../logic/admin-cookies";
import TwoFactorAuth, {
  AccountType2FA,
} from "../../components/TwoFactorAuth/TwoFactorAuth";

interface TwoFactorAuthSettingsProps {
  adminName: string;
  is2FA: boolean;
}

const TwoFactorAuthSettings = ({
  adminName,
  is2FA,
}: TwoFactorAuthSettingsProps) => {
  return (
    <AdminLayout adminName={adminName} header={"Weryfikacja dwuetapowa"}>
      <TwoFactorAuth
        is2FA={is2FA}
        accountType={AccountType2FA.ADMIN}
        accountID={adminName}
      />
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

  const is2FA = await getAdmin2FAData(ctx);

  return {
    props: {
      adminName: admin.name,
      is2FA: is2FA.is2FA,
    },
  };
}

export default TwoFactorAuthSettings;
