import { NextPageContext } from "next";
import DarkGreenSettingsButton from "../components/Buttons/DarkGreenSettingsButton/DarkGreenSettingsButton";
import { initCookies } from "../logic/user-cookies";

interface MainPageProps {
  cookie: string;
}

const MainPage = (props: MainPageProps) => {
  return (
    <>
      <h1>LangBara!</h1>
      <p>Your cookie: </p>
      <pre>
        <code>
          {props.cookie}
        </code>
      </pre>
      <hr/>
      <DarkGreenSettingsButton text="PLAY" href="/play"/>
      <hr/>
      <DarkGreenSettingsButton text="LOGIN" href="/login"/>
      <hr/>
      <DarkGreenSettingsButton text="LOGOUT" href="/logout"/>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  // const userData = await initCookies(ctx);
  // return {
  //   props: {
  //     cookie: JSON.stringify(userData, null, 2),
  //   },
  // };
  return {
    redirect: {
      permanent: false,
      destination: "/play",
    },
  }
}

export default MainPage;
