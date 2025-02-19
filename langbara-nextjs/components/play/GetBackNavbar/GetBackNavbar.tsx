import Link from "next/link";
import React from "react";
import { SettingsIcon, Wrapper } from "../NavbarPhone/NavbarPhone.styles";
import { BackIcon } from "./GetBackNavbar.styles";

interface Props {
  link: string;
}

const GetBackNavbar = ({link}: Props) => {
  return (
    <Wrapper>
      <Link href={link}>
        <a>
          <BackIcon src="/assets/back_icon.svg" alt="back_icon" />
        </a>
      </Link>
    </Wrapper>
  );
};

export default GetBackNavbar;
