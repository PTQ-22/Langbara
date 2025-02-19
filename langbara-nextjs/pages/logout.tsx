import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useUserPoints } from "../providers/UserPointsProvider";

const Logout: NextPage = () => {
  const { resetPoints } = useUserPoints();
  const router = useRouter();

  resetPoints();

  router.replace('/play');

  return <></>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  nookies.destroy(ctx, "auth", {'path': '/'});

  return { props: {} };
}

export default Logout;
