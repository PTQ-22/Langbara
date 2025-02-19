import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getWordForDaily, sendAnswerForUnlimited, WordResponse } from "../../../../logic/quiz-checker";
import ModeTemplate from "../ModesTemplate";


// TODO
const DailyQuestion = () => {

  const router = useRouter();

  const [dailyWordAPIResponse, setDailyWordAPIResponse] = useState<WordResponse | undefined>(undefined);
  const [gameStartTime, setGameStartTime] = useState(0); // in unix epoch miliseconds

  useEffect(() => {
    (async() => {
      const lvl = router.query.l as string;
      const resp = await getWordForDaily();
      if(typeof(resp) === 'string') {
        if(resp === 'ANSWERED_ALL') {
          router.replace('/play/answeredall');
        }
      } else if(resp === null) {
        console.log(resp);
        router.replace('/play');
      } else {
        // setCookie(null, 'auth', resp.cookies.auth, {path: '/'});
        setDailyWordAPIResponse(resp);
        setGameStartTime((new Date()).getTime());
      }
    })();
  }, []);

  return (
    <ModeTemplate 
      gameStartTime={gameStartTime}
      sendGuessFunction={sendAnswerForUnlimited}
      starting_guesses_num={dailyWordAPIResponse?.guesses_left}
      hints_num={dailyWordAPIResponse?.word.hints_num}
      word={dailyWordAPIResponse?.word}
      token={dailyWordAPIResponse?.token}
      max_points={dailyWordAPIResponse?.max_points || 0}
      points_drop={dailyWordAPIResponse?.points_drop || 0}
      loadNextWord={undefined} // dont show next word button
    />
  );
};

export default DailyQuestion;
