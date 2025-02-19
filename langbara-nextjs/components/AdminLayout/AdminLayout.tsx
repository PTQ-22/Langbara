import { ReactNode } from "react";
import { Logo } from "../Logo/Logo";
import Image from "next/image";
import {
  ChangeableWrapper,
  LogoutButton,
  LogoutWrapper,
  LogoWrapper,
  NavBar,
  Wrapper,
} from "./AdminLayout.styles";
import Link from "next/link";
import Router from "next/router";

interface Props {
  isMain?: boolean;
  adminName: string;
  header?: string;
  children: ReactNode;
}

const AdminLayout = ({
  children,
  isMain = false,
  adminName,
  header,
}: Props) => {
  return (
    <Wrapper>
      <NavBar>
        <LogoWrapper>
          {isMain ? null : (
            <Image
              src="/assets/arrow_back.svg"
              width={45}
              height={45}
              onClick={() => Router.push("/admin")}
            />
          )}
          <Logo />
        </LogoWrapper>
        <ChangeableWrapper>
          <h1>{header}</h1>
        </ChangeableWrapper>
        <LogoutWrapper>
          <h2>{adminName}</h2>
          <Link href="/admin/logout">
            <>
              <ChangeableWrapper>
                <LogoutButton>LOG OUT</LogoutButton>
              </ChangeableWrapper>
              <ChangeableWrapper isMobile>
                <Image src="/assets/logout.svg" width={45} height={45} />
              </ChangeableWrapper>
            </>
          </Link>
        </LogoutWrapper>
      </NavBar>
      <ChangeableWrapper isMobile>
        <h1>{header}</h1>
      </ChangeableWrapper>
      {children}
    </Wrapper>
  );
};

export default AdminLayout;
