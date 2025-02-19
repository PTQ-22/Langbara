import Button from "../../helpers/Button";
import {
  ColumnOne,
  ColumnTwo,
  HeroButtons,
  HeroFlex,
  LangBaraTitle,
  LimonSpan,
  TimerWrapper,
  Wrapper,
} from "./Hero.styles";
import { strings } from "../../../data/strings";
import Description from "../../helpers/Description";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Timer } from "../Timer/Timer";

const Hero: React.FC = (props: object) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <Wrapper id="Home">
      <HeroFlex>
        <ColumnOne>
          <LangBaraTitle>
            LANG<LimonSpan>BARA</LimonSpan>
          </LangBaraTitle>
          <Description textAlign={ width < 850 ? "center" : "left"}>
            {width < 700 ? strings.langbaraDescShort : strings.langbaraDesc}
          </Description>
          <HeroButtons>
            <Link href="/links"><Button color={"rgba(179, 197, 42"}>Linki</Button></Link>
            <Link href="/play"><Button
              color={width < 600 ? "rgba(255,255,255" : "rgba(179, 197, 42"}
            >
              Graj
            </Button>
            </Link>
          </HeroButtons>
        </ColumnOne>
        <ColumnTwo>
          <TimerWrapper>
            <div></div>
          </TimerWrapper>
        </ColumnTwo>
      </HeroFlex>
    </Wrapper>
  );
};

export default Hero;
