import { useEffect } from "react";
import { GoogleAnalytics } from "../components/GoogleAnalytics/GoogleAnalytics";
import { MetaTags } from "../components/MetaTags/MetaTags";
import Socials from "../components/socials/Socials/Socials";
const LinksPage = () => {
  useEffect(() => {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("portrait");
    }
    
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <MetaTags 
        title="LangBara"
      />
      <Socials />
    </>
  );
};

export default LinksPage;
