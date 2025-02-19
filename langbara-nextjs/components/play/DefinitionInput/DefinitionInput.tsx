import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { MainButton } from "../modes/ModeTemplate.styles";
import {
  Definition,
  DefinitionOutline,
  DefinitionWrapper,
  Input,
  Wrapper,
} from "./DefinitionInput.stylex";

interface Props {
  definition: string;
  hints: string[];
  getGuess: Function;
  blocked: boolean;
  onNextGameClicked: Function | undefined;
  gameEnd: boolean;
  children: React.ReactNode;
  correctInputValue ?: string;
}

const DefinitionInput = ({
  getGuess,
  blocked,
  definition,
  hints,
  onNextGameClicked,
  gameEnd,
  children,
  correctInputValue
}: Props) => {

  const router = useRouter();

  const [word, setWord] = useState("");
  const [isError, setIsError] = useState(false);
  const wordInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 25) {
      setIsError(true);
    } else {
      if (isError) {
        setIsError(false);
      }
    }
    setWord(event.target.value.trim());
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const wordUpperCase = word.toLocaleUpperCase();
      if (!isError && wordUpperCase.length > 1) {
        getGuess(wordUpperCase);
        setWord("");
      } else if (wordUpperCase.length <= 1) {
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    if(gameEnd) {
      setWord("");
    }
  }, [gameEnd])

  const onButtonClick = () => {
    if (!gameEnd) {
      getGuess(word.toLocaleUpperCase());
    } else {
      if(onNextGameClicked) {
        onNextGameClicked();
      }
    }
  };

  return (
    <Wrapper>
      <DefinitionWrapper>
        <DefinitionOutline>
          <Definition>
            {definition}
            {hints.length > 0 ? (
              <>
                <br />
                <br />
                {"Wskazówki:"}
              </>
            ) : (
              ""
            )}
            {hints.map((val, index) => {
              return (
                <span key={index}>
                  <br />
                  {index + 1 + ". "}
                  {val}
                </span>
              );
            })}
          </Definition>
        </DefinitionOutline>
        <Input
          isError={correctInputValue || isError ? true : false}
          disabled={blocked ? true : false}
          placeholder="wpisz..."
          value={correctInputValue ? correctInputValue : word}
          onChange={wordInputHandler}
          onKeyDown={keyDownHandler}
        />
      </DefinitionWrapper>
      {children}
      {gameEnd && onNextGameClicked === undefined ? 
        <MainButton onClick={() => router.replace('/play')}>
          Wróc do menu
        </MainButton> 
      : 
        <MainButton onClick={() => onButtonClick()}>
          {gameEnd ? "Następne słowo" : "Sprawdź"}
        </MainButton> 
      }
    </Wrapper>
  );
};
export default DefinitionInput;
