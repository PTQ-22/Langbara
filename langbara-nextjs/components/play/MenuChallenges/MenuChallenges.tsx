import { useEffect, useState } from "react";
import { MainMenuSectionWrapper } from "../../helpers/MainMenuSectionWrapper";
import { MainMenuTitle } from "../../helpers/MainMenuTitle";
import {
  Challenge,
  ChallengeContent,
  ChallengeStatus,
  ChallengeWrapper,
  MaxValBar,
  Row,
  ValBar,
} from "./MenuChallenges.styles";
interface ChallengesProps {
  desc: string;
  maxVal: number;
  currVal: number;
}

const MenuChallenges = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
  }, []);

  const challenges: Array<ChallengesProps> = [
    { desc: "Dodaj znajomych", maxVal: 5, currVal: 1 },
    { desc: "Zdobądź punkty", maxVal: 100, currVal: 60 },
    { desc: "Zagraj ze znajomym", maxVal: 5, currVal: 5 },
    { desc: "Zgadnij słowo", maxVal: 10, currVal: 8 },
  ];
  let shownChallenges: Array<ChallengesProps> = [];
  if (width < 600) {
    shownChallenges = [challenges[0], challenges[1]];
  } else if (width >= 600 && width < 800) {
    shownChallenges = [challenges[0], challenges[1], challenges[2]];
  } else if (width >= 800) {
    shownChallenges = [challenges[0], challenges[1], challenges[2], challenges[3]];
  }
  return (
    <MainMenuSectionWrapper>
      <MainMenuTitle>Wyzwania</MainMenuTitle>
      <ChallengeWrapper>
        {shownChallenges.map((challange: ChallengesProps) => {
          return (
            <Challenge key={challange.desc}>
              <Row>
                <ChallengeContent>{challange.desc}</ChallengeContent>
                <ChallengeStatus>
                  Status:
                  {challange.currVal === 0
                    ? " Nie zaczęty"
                    : challange.currVal < challange.maxVal
                    ? " Rozpoczęty"
                    : " Ukończony"}
                </ChallengeStatus>
              </Row>
              <MaxValBar>
                <ValBar
                  percent={(challange.currVal / challange.maxVal) * 100}
                ></ValBar>
              </MaxValBar>
            </Challenge>
          );
        })}
      </ChallengeWrapper>
    </MainMenuSectionWrapper>
  );
};

export default MenuChallenges;
