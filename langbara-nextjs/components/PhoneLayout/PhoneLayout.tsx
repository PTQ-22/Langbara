import { ReactNode, useEffect, useState } from "react";
import { GoogleAnalytics } from "../GoogleAnalytics/GoogleAnalytics";
import { FlexNavContainer } from "../helpers/FlexNavContainer";
import WholeGameWrapper from "../helpers/WholeGameWrapper";
import GetBackNavbar from "../play/GetBackNavbar/GetBackNavbar";
import { Wrapper } from "../../styles/play/MainMenu.styles";
import {
  PaddingLine,
  NavLine,
} from "../play/modes/ModeTemplate.styles";
import NavbarPhone from "../play/NavbarPhone/NavbarPhone";

interface Props {
  children: ReactNode;
  userName?: string;
  sideBarIndex?: number;
  backTo?: string;
}

// DO NOT USE THIS COMPONENT USE MainLayout.tsx INSTEAD!!!
const PhoneLayout = ({ children, userName, backTo, sideBarIndex = 0 }: Props) => {
  const [width, setWidth] = useState(NaN);

  useEffect(() => {
    setWidth(window.innerWidth);
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <>
      {width < 800 ? (
        <WholeGameWrapper>
          <GoogleAnalytics />
          <FlexNavContainer>
            {backTo ? (
              <GetBackNavbar link={backTo} />
            ) : (
              <NavbarPhone initialIndex={sideBarIndex} userName={userName} />
            )}
            <PaddingLine>
              <NavLine />
            </PaddingLine>
          </FlexNavContainer>
          <Wrapper>{children}</Wrapper>
        </WholeGameWrapper>
      ) : null}
    </>
  );
};

export default PhoneLayout;
