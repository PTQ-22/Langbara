import React, { useEffect, useState } from "react";
import { Hamburger, NavBarList, StyledNavBar } from "./Navbar.styles";

const Navbar: React.FC = (props: object) => {
  const links: string[] = ["Home", "Cele", "Opis", "Kontakt"];
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setscrollPosition] = useState(0);
  const visibilityHandler = (el: React.MouseEvent<HTMLElement>) => {
    setIsVisible(!isVisible);
  };
  
  useEffect(()=>{
    const scrollHandler = () =>{
      setIsVisible(false);
      setscrollPosition(window.scrollY);
    }
    window.addEventListener('resize', scrollHandler);
    window.addEventListener('scroll', scrollHandler);
  }, []);

  return (
    <StyledNavBar IsVisible={isVisible} scrollPosition = {scrollPosition}>
      <NavBarList>
        <Hamburger
          src={!isVisible ? "/assets/hamburger_icon.svg" : "/assets/close_navbar_icon.svg"}
          onClick={visibilityHandler}
          alt="navbar-menu-icon"
        />
        {links.map((el: string) => {
          return (
            <li key={el}>
              <a href={`#${el}`}>{el}</a>
            </li>
          );
        })}
      </NavBarList>
    </StyledNavBar>
  );
};

export default Navbar;
