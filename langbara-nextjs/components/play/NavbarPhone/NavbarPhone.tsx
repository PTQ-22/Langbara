import Link from "next/link";
import { useState } from "react";
import {
  SIDEBAR_ELEMENTS
} from "../../../data/constants";
import { useUserPoints } from "../../../providers/UserPointsProvider";
import LightGreenButton from "../../Buttons/LightGreenButton/LightGreenButton";
import NavbarPhoneItem from "../NavbarPhoneItem/NavbarPhoneItem";
import {
  Wrapper,
  Hamburger,
  SideMenu,
  CloseIcon,
  Column,
  LinksColumn,
  LoginButtonsWrapper,
  Right,
} from "./NavbarPhone.styles";

interface Props {
  initialIndex: number;
  userName?: string;
}

const NavbarPhone = ({ initialIndex, userName }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const { points } = useUserPoints();

  const onMenuClickHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeSelection = (index: number) => {
    if (index != selectedIndex) {
      setSelectedIndex(index);
    }
  };

  return (
    <Wrapper>
      <SideMenu isMenuOpen={isMenuOpen}>
        <Column isMenuOpen={isMenuOpen}>
          <CloseIcon
            src="/assets/close_icon.svg"
            onClick={onMenuClickHandler}
          />
          <LinksColumn>
            {SIDEBAR_ELEMENTS.map((elem, index) => {
              if(elem.loginRequired && !userName) return '';
              return (
                <Link
                  href={elem.href}
                  key={elem.name}
                  legacyBehavior
                >
                  <a>
                    <NavbarPhoneItem
                      changeSelected={changeSelection}
                      name={elem.name}
                      index={index}
                      selectedIndex={selectedIndex}
                      iconName={elem.icon}
                    />
                  </a>
                </Link>
              );
            })}
            {userName ? (
              <LightGreenButton text="WYLOGUJ" href="/logout" />
            ) : (
              <LoginButtonsWrapper>
                <LightGreenButton text="ZALOGUJ SIĘ" href="/login" />
                <LightGreenButton text="ZAREJESTRUJ SIĘ" href="/register" />
              </LoginButtonsWrapper>
            )}
          </LinksColumn>
        </Column>
      </SideMenu>
      <Hamburger
        src="/assets/hamburger_icon.svg"
        onClick={onMenuClickHandler}
        isMenuOpen={isMenuOpen}
      />
      <Right>
        {userName ? 
        
        <>
          <Hamburger
            src="/assets/account_icon.svg"
            isMenuOpen={false}
          />
          <span>{ userName }</span>
        </>
        
        : null}

        <Hamburger
          src="/assets/points_icon.svg"
          isMenuOpen={false}
        />
        <span>{ points }</span>

      </Right>
    </Wrapper>
  );
};

export default NavbarPhone;
