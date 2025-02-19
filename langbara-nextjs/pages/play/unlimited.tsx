import { NextPageContext } from "next";
import React, { createContext } from "react";
import { LayoutProps } from ".";
import { CenterOverlowAuto } from "../../components/Center/Center.styles";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import UnlimitedTries from "../../components/play/modes/UnlimitedTries/UnlimitedTries";
import { AccountType, initCookies } from "../../logic/user-cookies";

const UnlimitedModePage = ({ userName, points }: LayoutProps) => {
  return (
    <MainLayout
      points={points}
      userName={userName}
      backTo="/play">
        <CenterOverlowAuto>
          <UnlimitedTries />
        </CenterOverlowAuto>
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

export default UnlimitedModePage;
