import { PointIcon, Text } from "../play/LastGameItem/LastGameItem.styles";
import { StyledPlayerWrapper, PlaceWrapper, Group } from "./PlayerWrapper.styles";
import Image from "next/image";

interface PlayerWrapperProps {
  place: number;
  playerName: string;
  points: number;
}

const PlayerWrapper = ({ place, playerName, points }: PlayerWrapperProps) => {
  return (
    <StyledPlayerWrapper>
      {place >= 1 && place <= 3 ? (
        <PlaceWrapper>
          <Image src={`/assets/top${place}.svg`} width={30} height={30} />
        </PlaceWrapper>
      ) : (
        <PlaceWrapper>
          <Text justify="start">{place}.</Text>
        </PlaceWrapper>
      )}
      <Text justify="start">{playerName}</Text>
      <Group>
        <PointIcon src="/assets/points_icon.svg" />
        <Text justify="start">{points}</Text>
      </Group>
    </StyledPlayerWrapper>
  );
};

export default PlayerWrapper;