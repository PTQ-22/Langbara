import { ReactNode, useEffect, useState } from "react";
import { GoogleAnalytics } from "../GoogleAnalytics/GoogleAnalytics";
import { ContentWrapper } from "../helpers/ContentWrapper";
import { FlexContentDesktop } from "../helpers/FlexContentDesktop";
import WholeGameWrapper from "../helpers/WholeGameWrapper";
import { Wrapperito } from "../helpers/Wrapperito";
import { Wrapper } from "../../styles/play/MainMenu.styles";
import NavbarDesktop from "../play/NavBarDesktop/NavBarDesktop";
import TopMenu from "../play/TopMenu/TopMenu";

interface Props {
  children: ReactNode;
  userName?: string;
  sideBarIndex?: number;
  backTo?: string;
}

// DO NOT USE THIS COMPONENT USE MainLayout.tsx INSTEAD!!!
const DesktopLayout = ({ children, userName, sideBarIndex = 0, backTo }: Props) => {
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
      {width >= 800 ? (
        <WholeGameWrapper>
          <GoogleAnalytics />
          <Wrapper>
            <FlexContentDesktop>
              <NavbarDesktop initialIndex={sideBarIndex} userName={userName} backTo={backTo} />
              <Wrapperito>
                <ContentWrapper>
                  <TopMenu userName={userName} />
                  {children}
                </ContentWrapper>
              </Wrapperito>
            </FlexContentDesktop>
          </Wrapper>
        </WholeGameWrapper>
      ) : null}
    </>
  );
};

export default DesktopLayout;
