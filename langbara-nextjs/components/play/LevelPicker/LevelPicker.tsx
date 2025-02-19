import React from "react";
import { PlayMode } from "../../../data/constants";
import LevelPickerProps from "../../../types/levelPickerProp";
import Description from "../../helpers/Description";
import { MainMenuSectionWrapper } from "../../helpers/MainMenuSectionWrapper";
import { MainMenuTitle } from "../../helpers/MainMenuTitle";
import { LevelButton, LevelList } from "./LevelPicker.styles";

const LevelPicker = ({
  selectedLevel,
  levelList,
  changeSelectedLevel,
  selectedMode
}: LevelPickerProps) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    changeSelectedLevel((e.target as Element).innerHTML);
  };

  return (
    <MainMenuSectionWrapper selectedMode={selectedMode}>
      <MainMenuTitle>Wybierz poziom</MainMenuTitle>
      <LevelList>
        {levelList.map((level: string) => {
          return (
            <LevelButton
              key={level}
              isSelected={level === selectedLevel && selectedMode != PlayMode.DAILY ? true : false}
              onClick={onClickHandler}
            >
              {level}
            </LevelButton>
          );
        })}
      </LevelList>
    </MainMenuSectionWrapper>
  );
};

export default LevelPicker;
