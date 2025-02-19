import { useState } from "react";
import { Icon, Link, Wrapper } from "./NavbarPhoneItem.styles";

interface Props {
  name: string;
  iconName: string;
  selectedIndex: number;
  changeSelected: Function;
  index: number;
}

const NabarPhoneItem = ({
  name,
  iconName,
  selectedIndex,
  changeSelected,
  index,
}: Props) => {
  const clickHandler = () => {
    changeSelected(index);
  };

  return (
    <Wrapper
      isSelected={selectedIndex === index ? true : false}
      onClick={clickHandler}
    >
      <Icon src={"/assets/" + iconName + "_icon_menu.svg"} />
      <Link>{name.toLocaleUpperCase()}</Link>
    </Wrapper>
  );
};

export default NabarPhoneItem;
