import Link from "next/link";
import { useState } from "react";
import { SIDEBAR_ELEMENTS } from "../../../data/constants";
import { strings } from "../../../data/strings";
import NavBarDesktopItem from "../NavBarDesktopItem/NavBarDesktopItem";
import { Wrapper, Icons, Column, Hamburger } from "./NavBarDesktop.styles";

interface Props {
  initialIndex: number;
  userName?: string;
  backTo?: string;
}

const NavbarDesktop = ({ initialIndex, userName, backTo }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const changeSelection = (index: number) => {
    if (index != selectedIndex) {
      setSelectedIndex(index);
    }
  };

  return (
    <Wrapper>
      {backTo ? 
          <Link href={backTo}>
            <Hamburger src="/assets/back_icon.svg"></Hamburger>
          </Link>
      :
        <Hamburger></Hamburger>
      }

      <Icons>
        {SIDEBAR_ELEMENTS.map((elem, index) => {
          if (elem.loginRequired && !userName) return "";
          return (
            <Link href={elem.href} key={elem.name} legacyBehavior>
              <a>
                <NavBarDesktopItem
                  key={elem.name}
                  changeSelected={changeSelection}
                  index={index}
                  selectedIndex={selectedIndex}
                  iconName={elem.icon}
                />
              </a>
            </Link>
          );
        })}
      </Icons>
      <Column>
        <Link href={strings.links.tiktok}>
          <Hamburger src="/assets/tiktok_icon_small.svg" />
        </Link>
        <Link href={strings.links.instagram}>
          <Hamburger src="/assets/instagram_icon_small.svg" />
        </Link>
        <Link href={strings.links.facebook}>
          <Hamburger src="/assets/facebook.svg" />
        </Link>
      </Column>
    </Wrapper>
  );
};

export default NavbarDesktop;
