import { NextPageContext } from "next";
import styled from "styled-components";
import DesktopLayout from "../../components/DesktopLayout/DesktopLayout";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import PhoneLayout from "../../components/PhoneLayout/PhoneLayout";
import TwoFactorAuth, {
  AccountType2FA,
} from "../../components/TwoFactorAuth/TwoFactorAuth";
import { getUser2FAData, initCookies } from "../../logic/user-cookies";
import { LayoutProps } from "../play";

interface TwoFactorAuthSettingsProps extends LayoutProps {
  uid: string;
  is2FA: boolean;
}

const Desktop2FAWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const TwoFactorAuthSettings = ({ uid, is2FA, userName, points }: TwoFactorAuthSettingsProps) => {
  return (
    <MainLayout
      backTo="/user/account"
      points={points}
      sideBarIndex={1}
      userName={userName}
    >
      <Desktop2FAWrapper>
        <TwoFactorAuth
            is2FA={is2FA}
            accountType={AccountType2FA.USER}
            accountID={uid}
          />
      </Desktop2FAWrapper>
    </MainLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  const is2FA = await getUser2FAData(ctx);

  if (is2FA === null) {
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
      uid: userData.uid,
      is2FA: is2FA?.is2FA,
      points: userData.points
    },
  };
}

export default TwoFactorAuthSettings;
