import LastGameItem, { GameProps } from "../LastGameItem/LastGameItem";
import { Wrapper } from "./LastGames.styles";

interface Props {
  games: Array<GameProps>;
}

const LastGames = ({ games }: Props) => {
  return (
    <Wrapper>
      {games.map((game, index) => {
        return <LastGameItem key={index} word={game.word} time={game.time} points={game.points} isCorrect={game.isCorrect}/>
      })}
    </Wrapper>
  );
};

export default LastGames;
