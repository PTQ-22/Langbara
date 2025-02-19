import { setCookie } from "nookies";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import useModal from "../../../hooks/useModal";
import { getHint, SendAnswerAPIResponse, sendResign } from "../../../logic/quiz-checker";
import { setUserCookie } from "../../../logic/user-cookies";
import { useUserPoints } from "../../../providers/UserPointsProvider";
import { FlexContent } from "../../helpers/FlexContent";
import { PlayWrapper } from "../../helpers/PlayWrapper";
import { LangBaraTitle, LimonSpan } from "../../sections/Hero/Hero.styles";
import DefinitionInput from "../DefinitionInput/DefinitionInput";
import Guesses from "../Guesses/Guesses";
import { GameProps } from "../LastGameItem/LastGameItem";
import LastGames from "../LastGames/LastGames";
import {
  Line,
  OtherGap,
  WordInfoDiv,
  IconRow,
  Icon,
  Row,
  PointRow,
  ModalWrapper,
  ModalConfirmationText,
  ModalButtonWrapper,
  ModalButton,
} from "./ModeTemplate.styles";

ReactModal.setAppElement("#__next");

interface Props {
  word:
    | {
        definition: string;
        part: string;
      }
    | undefined;
  token: string | undefined;
  hints_num: number | undefined;
  starting_guesses_num: number | undefined;
  gameStartTime: number;
  loadNextWord: Function | undefined;
  sendGuessFunction: (
    guess: string,
    token: string
  ) => Promise<SendAnswerAPIResponse | null>;
  max_points: number;
  points_drop: number;
}

const ModeTemplate = ({
  word,
  starting_guesses_num: guesses_left,
  hints_num,
  gameStartTime,
  loadNextWord,
  sendGuessFunction,
  token,
  max_points,
  points_drop
}: Props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
  }, []);
  
  const { modalIsOpen, closeModal, openModal } = useModal();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [hints, setHints] = useState<string[]>([]);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [correct, setCorrect] = useState<string>("");
  const [earned, setEarned] = useState<number>(0);

  const { addPoints } = useUserPoints();

  const [games, setGames] = useState<Array<GameProps>>([]);

  if (guesses.length > 6 && width < 1000) {
    guesses.pop();
  }
  if (guesses.length > 8 && width >= 1000) {
    guesses.pop();
  }
  if (games.length > 4) {
    games.pop();
    setGames(games);
  }

  const hintsRemaining = (hints_num || hints.length) - hints.length;

  const onGuessSubmit = (word: string) => {
    if(word.length < 3) {
      return;
    }

    setGuesses((prev) => [word.toLocaleUpperCase(), ...prev]);
    (async () => {
      const resp = await sendGuessFunction(word.toLocaleLowerCase(), token!);

      if (resp !== null) {
        const time = Math.floor((new Date().getTime() - gameStartTime) / 1000);
        const points = resp.points;

        setEarned(points);
        addPoints(points);

        setUserCookie(resp.cookies.auth);

        if (resp.correct) {
          setCorrect(word.toLocaleLowerCase());
          setGameEnd(true);
          setGames((prev) => [
            { word: word.toLocaleUpperCase(), time, points, isCorrect: true },
            ...prev,
          ]);
        }

        if (resp.guesses_left === 0 && !resp.correct) {
          setCorrect(resp.word.toLocaleLowerCase() || "");
          setGames((prev) => [
            { word: resp.word.toLocaleUpperCase(), time, points,  isCorrect: false },
            ...prev,
          ]);
          setGameEnd(true);

          //alert("Przegrales! Slowo to " + resp.word); // TODO: Cypek Modal jakis ladny
        }
      }
    })();
  };

  const resign = () => {
   (async() => {
    if(token)
    {
      const time = Math.floor((new Date().getTime() - gameStartTime) / 1000);
      closeModal();
      const word = await sendResign(token);
      setGameEnd(!gameEnd);
      setEarned(0);
      if(word != null)
      {
        setCorrect(word);
        //setGuesses((prev) => [word.toLocaleUpperCase(), ...prev]);
        setGames((prev) => [{ word: word.toLocaleUpperCase(), time, points: 0,  isCorrect: false }, ...prev]);
      }
    }
   })();
    
  };

  const onNextGameClicked = () => {
    if(loadNextWord) {
      loadNextWord();
    }
    setGameEnd(!gameEnd);
    setGuesses([]);
    setHints([]);
  };

  const hintsButtonClickHandler = () => {
    if (!gameEnd) {
      if (hintsRemaining > 0) {
        (async () => {
          const resp = await getHint(hints.length, token!);

          console.log("HINT", resp);

          if (resp !== null) {
            setHints([...hints, resp]);
          }
        })();
      }
    }
  };

  return (
    <PlayWrapper>
      <FlexContent>
        <LangBaraTitle>
          LANG<LimonSpan>BARA</LimonSpan>
        </LangBaraTitle>
        <OtherGap>
          <WordInfoDiv>
            <span>
              Próby:{" "}
              {(guesses_left || guesses.length) - guesses.length}
            </span>
            <span>{word?.part || ""}</span>
          </WordInfoDiv>

          <DefinitionInput
            getGuess={onGuessSubmit}
            blocked={gameEnd}
            definition={word?.definition || ""}
            hints={hints}
            onNextGameClicked={loadNextWord === undefined ? undefined : onNextGameClicked}
            gameEnd={gameEnd}
            correctInputValue={gameEnd && earned === 0 ? correct : undefined}
          >
            <Row>
              <PointRow>
                <h1>{ 
                  gameEnd ? earned : max_points - guesses.length * points_drop
                }</h1>
                <img src="/assets/points_icon.svg" />
              </PointRow>
              <IconRow>
                <Icon
                  alt=""
                  src="/assets/hint.svg"
                  disabled={gameEnd || hintsRemaining === 0}
                  onClick={hintsButtonClickHandler}
                />
                <Icon
                  alt=""
                  src="/assets/resign.svg"
                  disabled={gameEnd}
                  onClick={() => {
                    if (!gameEnd) {
                      openModal();
                    }
                  }}
                />
              </IconRow>
            </Row>
          </DefinitionInput>

          {guesses.length > 0 ? <Line /> : ""}
          {guesses.length > 0 ? (
            <Guesses guesses={guesses} correct={correct} />
          ) : (
            ""
          )}
          {games.length > 0 ? <Line /> : ""}
          <LastGames games={games} />
        </OtherGap>
      </FlexContent>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: width > 600 ? "450px" : "auto",
            borderRadius: "5px",
            border: "none",
            width: width > 600 ? "20%" : "calc(100% - 60px)",
            height: "200px",
            background: "#10363E",
          },
        }}
      >
        <ModalWrapper>
          <ModalConfirmationText>
            Czy na pewno chcesz się poddać?
          </ModalConfirmationText>
          <ModalButtonWrapper>
            <ModalButton cancel onClick={closeModal}>
              ANULUJ
            </ModalButton>
            <ModalButton cancel={false} onClick={resign}>
              POTWIERDŹ
            </ModalButton>
          </ModalButtonWrapper>
        </ModalWrapper>
      </ReactModal>
    </PlayWrapper>
  );
};

export default ModeTemplate;
