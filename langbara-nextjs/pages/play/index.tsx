import { NextPageContext } from "next";
import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import DesktopLayout from "../../components/DesktopLayout/DesktopLayout";
import { FlexContent } from "../../components/helpers/FlexContent";
import { MainMenuWrapper } from "../../components/helpers/MainMenuWrapper";
import { LanguageLevelModal } from "../../components/LanguageLevelModal/LanguageLevelModal";
import { MetaTags } from "../../components/MetaTags/MetaTags";
import PhoneLayout from "../../components/PhoneLayout/PhoneLayout";
import LevelPicker from "../../components/play/LevelPicker/LevelPicker";
import LevelPickerPC from "../../components/play/LevelPickerPC/LevelPickerPC";
import ModeOption from "../../components/play/ModeOption/ModeOption";
import { MainButton } from "../../components/play/modes/ModeTemplate.styles";
import ModeSlider from "../../components/play/ModeSlider/ModeSlider";
import { PLAY_MENU_MODES, PLAY_MENU_LEVELS, PlayMode } from "../../data/constants";
import { strings } from "../../data/strings";
import { levelConverter } from "../../logic/level-converter";
import { AccountType, hasUserAnsweredTodayDaily, initCookies, LanguageLevel } from "../../logic/user-cookies";
import { UserDataProvider } from "../../providers/UserPointsProvider";
import { Line, MainMenuPosition } from "../../styles/play/MainMenu.styles";

export interface LayoutProps {
  userName?: string;
  points: number;
}

interface PlayPageProps extends LayoutProps{
  languageLevel: LanguageLevel | null;
  hasAnsweredDaily: boolean;
}

const MenuPage = ({ userName, languageLevel, hasAnsweredDaily, points }: PlayPageProps) => {

  const answeredDailyToast = () => toast("Odpowiedziałeś już na daily question!");

  const [selectedLevel, setSelectedLevel] = useState(levelConverter(languageLevel || 1)!);
  
  const changeSelectedLevel = (newLevel: string) => {
    setSelectedLevel(newLevel);
  };

  const [selectedMode, setSelectedMode] = useState(0);

  const playButtonClickHandler = () => {
    if(hasAnsweredDaily && selectedMode === PlayMode.DAILY) {
      answeredDailyToast();
      return;
    }

    router.push(`/play/${PLAY_MENU_MODES[selectedMode]}?l=${selectedLevel}`, `/play/${PLAY_MENU_MODES[selectedMode]}`);
  };

  return (
    <>
    <MetaTags 
      title="LangBara"
      description={strings.langbaraDesc}
      keywords="język angielski, nauka poprzez grę, gra do nauki, kapibara, zgadywanie, słowa, definicje, pytania, zagadka, ćwiczenia, słówka, gra mobilna, słownictwo, nauka języka, egzamin z angielskiego, język, angielski, nauka angielskiego, nauka, angielski słownictwo"
    />
      <UserDataProvider startingPoints={points}>
        <LanguageLevelModal languageLevel={languageLevel} allowClosingWithoutSet={false} />
        <PhoneLayout sideBarIndex={0} userName={userName}>
          <FlexContent>
            <ModeSlider
              changeSelectedMode={setSelectedMode}
              selectedMode={selectedMode}
            />
            <LevelPicker
              selectedLevel={selectedLevel}
              selectedMode={selectedMode}
              changeSelectedLevel={changeSelectedLevel}
              levelList={PLAY_MENU_LEVELS}
            />

            <MainButton onClick={playButtonClickHandler}>Play</MainButton>

            {/* <Line />
            <MenuChallenges /> */}
          </FlexContent>
        </PhoneLayout>
        <DesktopLayout sideBarIndex={0} userName={userName}>
          <MainMenuPosition>
            <MainMenuWrapper>
              <ModeOption
                changeSelectedMode={setSelectedMode}
                selectedMode={selectedMode}
              />
              <LevelPickerPC
                selectedLevel={selectedLevel}
                selectedMode={selectedMode}
                changeSelectedLevel={changeSelectedLevel}
                levelList={PLAY_MENU_LEVELS}
              />
              <MainButton onClick={playButtonClickHandler}>Play</MainButton>
              <Line />
            </MainMenuWrapper>
          </MainMenuPosition>
        </DesktopLayout>
      </UserDataProvider>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  let userName =
    userData.account_type === AccountType.REGISTERED ? userData.registered.display_name : null;

  const answeredDaily = hasUserAnsweredTodayDaily(userData);

  return {
    props: {
      userName,
      languageLevel: userData.language_level,
      hasAnsweredDaily: answeredDaily,
      points: userData.points
    },
  };
}

export default MenuPage;
