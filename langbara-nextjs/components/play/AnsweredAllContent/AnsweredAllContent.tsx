import { useRouter } from "next/router";
import React, { useState } from "react";
import { strings } from "../../../data/strings";
import { levelConverter } from "../../../logic/level-converter";
import { Column, Desc, Info, InfoGroup, InfoIcon, InfoText, MaxWidthColumn, Subtitle, TextHeader, Title } from "../../../styles/sideBarPages/sideBarPages.styles";


const AnsweredAllContent = () => {
  const router = useRouter();

  const lvl = router.query.lvl as string;
  const amount = router.query.num as string;
  
  return (
    <Column center = {false}>
      <TextHeader>
        <Title>KONIEC</Title>
      </TextHeader>
      <MaxWidthColumn>
        <Subtitle>Osiągnięcia</Subtitle>
        <InfoGroup>
          <Info>
            <InfoText>Ukończyłeś poziom {lvl}</InfoText>
            <InfoIcon src="/assets/award_icon.svg" />
          </Info>
          <Info>
            <InfoText>Odpowiedziałeś na {amount} pytań</InfoText>
            <InfoIcon src="/assets/award_icon.svg" />
          </Info>
        </InfoGroup>
        {/* <Subtitle>Podziękowania</Subtitle>
        <Desc>{strings.loremIpsum}</Desc> */}
      </MaxWidthColumn>
    </Column>
  );
};

export default AnsweredAllContent;
