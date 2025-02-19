import { NextPageContext } from "next";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import Friends from "../../components/play/sideBarPages/Friends/Friends";
import { AccountType, initCookies } from "../../logic/user-cookies";
import { LayoutProps } from "../play";

const FriendsPage = ({ userName, points }: LayoutProps) => {
  return (
    <MainLayout
      sideBarIndex={2}
      points={points}
      userName={userName}
    >
      <Friends />
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

export default FriendsPage;
