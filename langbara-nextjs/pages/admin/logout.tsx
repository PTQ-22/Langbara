import { NextPage, NextPageContext } from "next";
import nookies from "nookies";

const Logout: NextPage = () => {
  return <></>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  nookies.destroy(ctx, "adminauth", {'path': '/'});

  return {
    redirect: {
      permanent: false,
      destination: "/admin",
    },
  };
}

export default Logout;
