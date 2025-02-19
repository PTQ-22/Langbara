import { NextPageContext } from "next";
import { LayoutProps } from ".";
import { CenterOverlowAuto } from "../../components/Center/Center.styles";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import DailyQuestion from "../../components/play/modes/DailyQuestion/DailyQuestion";
import { AccountType, hasUserAnsweredTodayDaily, initCookies } from "../../logic/user-cookies";

const DailyModePage = ({userName, points}: LayoutProps) => {
  return (
    <MainLayout
      backTo="/play"
      points={points}
      userName={userName}
      >
        <CenterOverlowAuto>
          <DailyQuestion />
        </CenterOverlowAuto>
    </MainLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  let userName =
    userData.account_type === AccountType.REGISTERED ? userData.registered.display_name : null;

  if(hasUserAnsweredTodayDaily(userData)) {
    return {
      redirect: {
        permanent: false,
        destination: "/play",
      },
    };
  }
  
  return {
    props: {
      userName,
      points: userData.points
    },
  };
}

export default DailyModePage;
