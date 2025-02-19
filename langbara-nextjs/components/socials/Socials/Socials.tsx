import {
  BlueSpan,
  DarkPinkSpan,
  OrangeSpan,
} from "../../sections/Slogan/Slogan.styles";
import SocialCard from "../SocialCard/SocialCard";
import { Grid, Title, Wrapper, MainWrapper, CirclePurple, CircleLightBlueLeft, CircleLightBlueRight, CircleOrange } from "./Socials.styles";
import { strings } from '../../../data/strings';
import { useEffect, useState } from "react";

const Socials = () => {
  
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    const resizeHandler = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeHandler);
    console.log(innerHeight);
  }, []);

  return (
    <MainWrapper height={height}>
      <CircleOrange src="/assets/orange_circle_links.svg"/>
      <CirclePurple src="/assets/purple_circle_links.svg"/>
      <CircleLightBlueLeft src="/assets/light_green_circle_left_bottom_links.svg"/>
      <CircleLightBlueRight src="/assets/light_green_circle_right_top_links.svg"/>
      <Wrapper>
        <Title>
          <BlueSpan>Śledź</BlueSpan> nas na <OrangeSpan>bieżąco</OrangeSpan>
          <br></br> na naszych <DarkPinkSpan>social mediach</DarkPinkSpan>
        </Title>
        <Grid>
          <SocialCard
            name={"@langbara.pl"}
            platform={"INSTAGRAM"}
            link={strings.links.instagram}
            icon={"/assets/instagram_icon_small.svg"}
            alt={"instagram_icon"}
            color={"rgba(255, 123, 0"}
            index={1}
          />
          <SocialCard
            name={"@LangBara"}
            platform={"FACEBOOK"}
            link={strings.links.facebook}
            icon={"/assets/facebook_icon_small.svg"}
            alt={"facebook_icon"}
            color={"rgba(151, 99, 145"}
            index={2}
          />
          <SocialCard
            name={"@langbara"}
            platform={"TIK TOK"}
            link={strings.links.tiktok}
            icon={"/assets/tiktok_icon_small.svg"}
            alt={"tiktok_icon"}
            color={"rgba(114, 161, 229"}
            index={3}
          />
          <SocialCard
            name={"@langbarapl"}
            platform={"MAIL"}
            link={"mailto:" + strings.gmail}
            icon={"/assets/gmail_icon_small.svg"}
            alt={"gmail_icon"}
            color={"rgba(255, 255, 255"}
            index={4}
          />
        </Grid>
      </Wrapper>
    </MainWrapper>
  );
};

export default Socials;
