import Navbar from "../components/Navbar/Navbar";
import Slogan from "../components/sections/Slogan/Slogan";
import Footer from "../components/sections/Footer/Footer";
import Hero from "../components/sections/Hero/Hero";
import SmallCards from "../components/sections/SmallCards/SmallCards";
import Stats from "../components/sections/Stats/Stats";
import ArrowBlue from "../components/helpers/ArrowBlue";
import Aims from "../components/sections/Aims/Aims";
import ArrowYellow from "../components/helpers/ArrowYellow";
import { useEffect } from "react";
import { GoogleAnalytics } from "../components/GoogleAnalytics/GoogleAnalytics";
import { MetaTags } from "../components/MetaTags/MetaTags";
import { strings } from "../data/strings";

const HomePage = () => {
  useEffect(() => {
    if(!window.location.href.includes('#')) {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) {
        window.setTimeout(() => {
          window.scrollTo({ top: 0 });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <MetaTags 
        title="LangBara"
        description={strings.langbaraDesc}
        keywords="język angielski, nauka poprzez grę, gra do nauki, kapibara, zgadywanie, słowa, definicje, pytania, zagadka, ćwiczenia, słówka, gra mobilna, słownictwo, nauka języka, egzamin z angielskiego, język, angielski, nauka angielskiego, nauka, angielski słownictwo"
      />
      <Navbar />
      <Hero />
      <SmallCards />
      <ArrowBlue />
      <Aims />
      <ArrowYellow id={1} />
      <Slogan />
      <ArrowYellow />
      <Stats />
      <Footer />
    </>
  );
};

export default HomePage;
