import { NextPageContext } from "next";
import Link from "next/link";
import { MainLayout } from "../components/MainLayout/MainLayout";
import Settings from "../components/play/sideBarPages/Settings/Settings";
import { Footer } from "../components/play/sideBarPages/Settings/Settings.styles";
import { AccountType, initCookies, LanguageLevel } from "../logic/user-cookies";
import { LayoutProps } from "./play";

interface Props extends LayoutProps {
  languageLevel: LanguageLevel | null;
}

const SettingsPage = ({ userName, languageLevel, points }: Props) => {
  return (
    <>
      <MainLayout sideBarIndex={3} userName={userName} points={points}>
        <Settings languageLevel={languageLevel} userName={userName} />
        <Footer>
          <p>
            WordNet 3.0 Copyright 2006 by Princeton University. All rights
            reserved.
          </p>
        </Footer>
      </MainLayout>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  let userName =
    userData.account_type === AccountType.REGISTERED
      ? userData.registered.display_name
      : null;

  return {
    props: {
      userName,
      languageLevel: userData.language_level,
      points: userData.points,
    },
  };
}

export default SettingsPage;
