import { NextPageContext } from "next";
import DesktopLayout from "../../components/DesktopLayout/DesktopLayout";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import PhoneLayout from "../../components/PhoneLayout/PhoneLayout";
import Account from "../../components/play/sideBarPages/Account/Account";
import { AccountType, initCookies } from "../../logic/user-cookies";
import { LayoutProps } from "../play";

const AccountPage = ({ userName, points }: LayoutProps) => {
  return (
    <MainLayout
      sideBarIndex={1}
      points={points}
      userName={userName}
    >
      <Account />
    </MainLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  let userName =
    userData.account_type === AccountType.REGISTERED ? userData.registered.display_name : null;
  
  return {
    props: {
      userName,
      points: userData.points
    },
  };
}

export default AccountPage;
