import { Wrapper, WrapperCorrect, WrapperWrong } from "./Guesses.styles";

interface Props {
  guesses: Array<string>;
  correct: string;
}

const Guesses = ({ guesses, correct }: Props) => {
  return (
    <Wrapper>
      {guesses.map((guess: string, index: number) => {
        if (guess.toLocaleLowerCase() !== correct.toLocaleLowerCase()) {
          return (
            <WrapperWrong key={index + Math.random()}>{guess}</WrapperWrong>
          );
        } else {
          return (
            <WrapperCorrect key={index + Math.random()}>{guess}</WrapperCorrect>
          );
        }
      })}
    </Wrapper>
  );
};

export default Guesses;
