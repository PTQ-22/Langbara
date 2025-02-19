import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useEffect, useState } from "react";
import { getWordForUnlimited, ErrorDataResponse, sendAnswerForUnlimited, WordResponse } from "../../../../logic/quiz-checker";
import ModeTemplate from "../ModesTemplate";

const UnlimitedTries = () => {

  const router = useRouter();

  const [unlimitedWordAPIResponse, setUnlimitedWordAPIResponse] = useState<WordResponse | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0); // in unix epoch miliseconds


  useEffect(() => {

    (async() => {
      const lvl = router.query.l as string;
      const resp = await getWordForUnlimited(lvl);
      if(resp === null) {
        router.replace('/play');
      } else if(resp.msg === 'ANSWERED_ALL') {
        router.replace(`/play/answeredall?lvl=${lvl}&num=${(resp.json as ErrorDataResponse).data}`, '/play/answeredall');
      } else {
        //setCookie(null, 'auth', resp.cookies.auth, {path: '/'});
        setUnlimitedWordAPIResponse(resp.json as WordResponse);
        setGameStartTime((new Date()).getTime());
      }
    })();
  }, [refresh]);

  return (
    <ModeTemplate 
      sendGuessFunction={sendAnswerForUnlimited}
      gameStartTime={gameStartTime}
      starting_guesses_num={unlimitedWordAPIResponse?.guesses_left}
      hints_num={unlimitedWordAPIResponse?.word.hints_num}
      loadNextWord={() => {setRefresh(!refresh)}}
      word={unlimitedWordAPIResponse?.word}
      token={unlimitedWordAPIResponse?.token}
      max_points={unlimitedWordAPIResponse?.max_points || 0}
      points_drop={unlimitedWordAPIResponse?.points_drop || 0}
    />
  );
};

export default UnlimitedTries;
