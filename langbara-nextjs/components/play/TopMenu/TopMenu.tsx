import { useUserPoints } from "../../../providers/UserPointsProvider";
import WhiteBorderButton from "../../Buttons/WhiteBorderButton/WhiteBorderButton";
import { Center } from "../../Center/Center.styles";
import { Hamburger } from "../NavBarDesktop/NavBarDesktop.styles";
import {
  Wrapper,
  Right,
  LangBaraText,
  LimonSpan,
  ContentWrapper,
} from "./TopMenu.styles";

interface Props {
  userName?: string;
}

const TopMenu = ({ userName }: Props) => {

  const { points } = useUserPoints();

  return (
    <Wrapper>
      <ContentWrapper>
        <LangBaraText>
          LANG<LimonSpan>BARA</LimonSpan>
        </LangBaraText>
      </ContentWrapper>
      <Right>

      {userName ? 
        
        <>
          <Hamburger
            src="/assets/account_icon.svg"
          />
          <span>{ userName }</span>
        </>
        
        : null}

        <div></div>

        <Hamburger
          src="/assets/points_icon.svg"
        />
        <span>{ points }</span>

        <div></div>

        {userName ? (
          <>
            <WhiteBorderButton text="WYLOGUJ SIĘ" href="/logout"/>
          </>
        ) : (
          <>
            <WhiteBorderButton text="ZALOGUJ SIĘ" href="/login" />
            <WhiteBorderButton text="ZAREJESTRUJ SIĘ" href="/register" />
          </>
        )}
      </Right>
    </Wrapper>
  );
};

export default TopMenu;
