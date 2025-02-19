import { MainMenuSectionWrapper } from "../../helpers/MainMenuSectionWrapper";
import {
  Mode,
  ModeTitle,
  ModeDescription,
  Column as Row,
} from "./ModeOption.styles";
import ModeSelectionProps from "../../../types/modeSelectionProps";
import { MODES_ARRAY } from "../../../data/constants";

const ModeOption = ({ changeSelectedMode, selectedMode }: ModeSelectionProps) => {

  return (
    <MainMenuSectionWrapper>
      <Row>
        {MODES_ARRAY.map(
          (
            mode: { first: string; second: string; desc: string },
            index: number
          ) => {
            return (
              <Mode
                key={mode.first + " " + mode.second}
                isSelected={selectedMode === index}
                onClick={() => {
                  changeSelectedMode(index);
                }}
              >
                <ModeTitle>
                  {mode.first + " "} <span>{mode.second}</span>
                </ModeTitle>
                <ModeDescription>{mode.desc}</ModeDescription>
              </Mode>
            );
          }
        )}
      </Row>
    </MainMenuSectionWrapper>
  );
};
export default ModeOption;
