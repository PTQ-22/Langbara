import { StyledDarkGreenSettingsButton } from "./DarkGreenSettingsButton.styles";
import Image from "next/image";
import Link from "next/link";

interface Props {
  text: string;
  href?: string;
  svgPath?: string;
}

const DarkGreenSettingsButton = ({ text, href = "", svgPath }: Props) => {
  return (
    <Link href={href}>
      <StyledDarkGreenSettingsButton>
        <span>{text}</span>
        {svgPath ? (
          <Image src={"/assets/edit_icon.svg"} width={20} height={20} />
        ) : null}
      </StyledDarkGreenSettingsButton>
    </Link>
  );
};

export default DarkGreenSettingsButton;
