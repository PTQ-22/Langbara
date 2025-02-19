import { Icon,  Wrapper } from "./NavBarDesktopItem.styles";
import Image from "next/image";

interface Props {
  iconName: string;
  selectedIndex: number;
  changeSelected: Function;
  index: number;
}

const NavBarDesktopItem = ({
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
      <Image src={"/assets/" + iconName + "_icon_menu.svg"} width={22} height={22} layout="fixed" />
    </Wrapper>
  );
};

export default NavBarDesktopItem;
