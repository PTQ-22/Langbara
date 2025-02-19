import SmallCard from "../../helpers/SmallCard";
import Header from "../../helpers/Header";
import Description from "../../helpers/Description";
import { strings } from "../../../data/strings";
import { SmallCardsContent, Wrapper } from "./SmallCards.styles";

const SmallCards: React.FC = (props: object) => {

  return (
    <Wrapper>
      <SmallCardsContent>
        <SmallCard color="rgba(0, 0, 0, 0.2)">
          <Header>Nauka</Header>
          <Description textAlign="center">{strings.naukaText}</Description>
        </SmallCard>
        <SmallCard color="rgba(0, 0, 0, 0.2)">
          <Header>Wygoda</Header>
          <Description textAlign="center">{strings.wygodaText}</Description>
        </SmallCard>
        <SmallCard color="rgba(0, 0, 0, 0.2)">
          <Header>Zabawa</Header>
          <Description textAlign="center">{strings.zabawaText}</Description>
        </SmallCard>
      </SmallCardsContent>
    </Wrapper>
  );
};

export default SmallCards;
