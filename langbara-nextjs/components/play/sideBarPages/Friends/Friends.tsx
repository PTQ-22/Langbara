import { useEffect, useState } from "react";
import { FlexContent } from "../../../helpers/FlexContent";
import { FlexNavContainer } from "../../../helpers/FlexNavContainer";
import NavbarPhone from "../../NavbarPhone/NavbarPhone";

const Friends = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
  }, []);
  return <></>;
};

export default Friends;
