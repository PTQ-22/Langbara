import { strings } from "../../../data/strings";
import {
  One,
  StatsContent,
  StatsInfo,
  StatsInfoContainer,
  StatsNumber,
  StatsNumberNoFont,
  StatsText,
  StatsTitle,
  Three,
  Two,
  Wrapper,
} from "./Stats.styles";
const Stats: React.FC = () => {
  return (
    <Wrapper>
      <StatsContent>
        <StatsTitle>{strings.statsTitle}</StatsTitle>
        <StatsInfoContainer>
          <One>
            <StatsInfo>
              <StatsNumber>20 000+</StatsNumber>
              <StatsText>linii kodu</StatsText>
            </StatsInfo>
          </One>
          <Two>
            <StatsInfo>
              <StatsNumber>7</StatsNumber>
              <StatsText>członków projektu</StatsText>
            </StatsInfo>
          </Two>
          <Three>
            <StatsInfo>
              <StatsNumberNoFont>&infin;</StatsNumberNoFont>
              <StatsText>
                możliwości
              </StatsText>
            </StatsInfo>
          </Three>
        </StatsInfoContainer>
      </StatsContent>
    </Wrapper>
  );
};

export default Stats;
