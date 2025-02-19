import {
  BigCard,
  BlueSpan,
  DarkPinkSpan,
  OrangeSpan,
  SloganFlexDiv,
  Title,
  Wrapper,
} from "./Slogan.styles";
import Description from "../../helpers/Description";
import { strings } from "../../../data/strings";

const Slogan: React.FC = () => {
  return (
    <Wrapper>
      <SloganFlexDiv>
        <div>
          <Title>
            <BlueSpan>Rozwiązuj</BlueSpan> codzienną{" "}
            <OrangeSpan>zagadkę</OrangeSpan> i
            <br /> rywalizuj z <DarkPinkSpan>innymi</DarkPinkSpan>!
          </Title>
        </div>
        <BigCard>
          <Description textAlign="center">{strings.slogan}</Description>
        </BigCard>
      </SloganFlexDiv>
    </Wrapper>
  );
};

export default Slogan;
