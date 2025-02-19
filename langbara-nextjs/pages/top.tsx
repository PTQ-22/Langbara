import { NextPageContext } from "next";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { AccountType, initCookies } from "../logic/user-cookies";
import { fetchTopUsers, TopUser } from "../logic/top-users";
import PlayerWrapper from "../components/PlayerWrapper/PlayerWrapper";
import { TopPlayersWrapper} from "../styles/play/top.styles";
import { Column, LongTitle} from "../styles/sideBarPages/sideBarPages.styles";
import { LayoutProps } from "./play";

interface TopPageProps extends LayoutProps {
  players: TopUser[];
}

const TopPage = ({ userName, players, points }: TopPageProps) => {
  return (
    <>
      <MainLayout sideBarIndex={2} userName={userName} points={points}>
        <Column center>
          <LongTitle>TOP 10 PLAYERS</LongTitle>
          <TopPlayersWrapper>
            {players.map(({ display_name, points }, index) => (
              <PlayerWrapper
                key={index}
                place={index + 1}
                playerName={display_name}
                points={points}
              />
            ))}
          </TopPlayersWrapper>
        </Column>
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

  const players = await fetchTopUsers();

  return {
    props: {
      userName,
      players,
      points: userData.points
    },
  };
}

export default TopPage;
