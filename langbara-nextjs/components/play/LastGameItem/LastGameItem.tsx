import {
  Wrapper,
  Text,
  FlexOne,
  IconButton,
  PointIcon,
  Group,
} from "./LastGameItem.styles";

export interface GameProps {
  points: number;
  word: string;
  time: number;
  isCorrect: boolean;
}

const LastGameItem = ({ points, word, time, isCorrect }: GameProps) => {
  return (
    <Wrapper>
      <Text justify="start">{word}</Text>
      <Group>
        <PointIcon src="/assets/points_icon.svg" />
        <Text justify="start">{points}</Text>
      </Group>
      <Text justify="end">{time + "s"}</Text>
      <IconButton src={"/assets/" + (isCorrect ? 'correct.svg' : 'incorrect.svg') }></IconButton>
      {/* <IconButton src="/assets/recover_icon.svg"></IconButton> */}
    </Wrapper>
  );
};

export default LastGameItem;
