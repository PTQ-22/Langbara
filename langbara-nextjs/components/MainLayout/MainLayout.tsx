import React, { ReactNode } from 'react'
import { UserDataProvider, useUserPoints } from '../../providers/UserPointsProvider';
import { Wrapper } from '../../styles/play/MainMenu.styles';
import { GoogleAnalytics } from '../GoogleAnalytics/GoogleAnalytics';
import { ContentWrapper } from '../helpers/ContentWrapper';
import { FlexContentDesktop } from '../helpers/FlexContentDesktop';
import { FlexNavContainer } from '../helpers/FlexNavContainer';
import WholeGameWrapper from '../helpers/WholeGameWrapper';
import { Wrapperito } from '../helpers/Wrapperito';
import GetBackNavbar from '../play/GetBackNavbar/GetBackNavbar';
import { NavLine, PaddingLine } from '../play/modes/ModeTemplate.styles';
import NavbarDesktop from '../play/NavBarDesktop/NavBarDesktop';
import NavbarPhone from '../play/NavbarPhone/NavbarPhone';
import TopMenu from '../play/TopMenu/TopMenu';


interface Props {
  children: ReactNode;
  userName?: string;
  sideBarIndex?: number;
  backTo?: string;
  points: number;
}

export const MainLayout = ({children, userName, sideBarIndex, backTo, points }: Props) => {
  return (
    <UserDataProvider startingPoints={points}>
      <WholeGameWrapper>
        <GoogleAnalytics />
        <FlexNavContainer>
          {backTo ? (
            <GetBackNavbar link={backTo} />
          ) : (
            <NavbarPhone initialIndex={sideBarIndex || 0} userName={userName} />
          )}
          <PaddingLine>
            <NavLine />
          </PaddingLine>
        </FlexNavContainer>
        <Wrapper>
          <FlexContentDesktop>
            <NavbarDesktop initialIndex={sideBarIndex || 0} userName={userName} backTo={backTo} />
            <Wrapperito>
              <ContentWrapper>
                <TopMenu userName={userName} />
                {children}
              </ContentWrapper>
            </Wrapperito>
          </FlexContentDesktop>
        </Wrapper>
      </WholeGameWrapper>
    </UserDataProvider>
  )
}
