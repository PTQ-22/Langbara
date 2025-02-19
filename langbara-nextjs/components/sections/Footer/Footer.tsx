import { useEffect, useState } from "react";
import { strings } from "../../../data/strings";
import {
  FirstColumn,
  FooterTopContent,
  FooterLinks,
  FooterSponsors,
  LinksContainer,
  SecondColumn,
  Title,
  Wrapper,
  FooterContent,
  FooterBottomContent,
  Line,
  SecondRow,
  SocialMedia,
  Image,
  ZWZT,
  Gmail,
  SponsorsContainer,
} from "./Footer.styles";

interface Props {
  width: number;
}

const TitleComponent = ({ width }: Props) => {
  if (width > 800) {
    return (
      <Title>
        Łatwa <br />
        nauka <br />
        już teraz
      </Title>
    );
  } else {
    return <Title>Łatwa nauka już teraz</Title>;
  }
};

const Footer: React.FC = () => {
  const listy: string[] = ["O nas", "Więcej", "Olimpiada", "Partnerzy"];

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
  }, []);
  return (
    <Wrapper id="Kontakt">
      <FooterContent>
        <FooterTopContent>
          <FirstColumn>
            <TitleComponent width={width} />
            <Gmail href={"mailto:" + strings.gmail}>{strings.gmail}</Gmail>
          </FirstColumn>
          {/* <SecondColumn>
            <LinksContainer>
              {listy.map((el: string) => {
                return (
                  <FooterLinks key={el} className="footer-links">
                    {el}
                  </FooterLinks>
                );
              })}
            </LinksContainer>
            <SponsorsContainer>
              <FooterSponsors>Nazwa.pl</FooterSponsors>
              <FooterSponsors>Brainly</FooterSponsors>
            </SponsorsContainer>
          </SecondColumn> */}
        </FooterTopContent>
        <FooterBottomContent>
          <Line />
          <SecondRow>
            <SocialMedia>
              <a href="https://www.instagram.com/langbara.pl/">
                <Image src="/assets/instagram_icon_big.svg" alt="instagram_big_icon" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100088595702583">
                <Image src="/assets/facebook.svg" alt="facebook_big_icon" />
              </a>
              <a href="mailto:kontakt@langbara.pl">
                <Image src="/assets/mail.svg" alt="gmail_big_icon" />
              </a>
            </SocialMedia>
            <ZWZT src="/assets/zwolnieni_z_teorii_logo.svg"></ZWZT>
          </SecondRow>
        </FooterBottomContent>
      </FooterContent>
    </Wrapper>
  );
};

export default Footer;
