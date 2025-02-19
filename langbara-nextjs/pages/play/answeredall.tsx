import { NextPageContext } from 'next';
import React from 'react'
import { LayoutProps } from '.';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import AnsweredAllContent from '../../components/play/AnsweredAllContent/AnsweredAllContent';
import { AccountType, initCookies } from '../../logic/user-cookies';

const AnsweredAll = ({ userName, points }: LayoutProps) => {
  return (
    <MainLayout
      backTo='/play'
      points={points}
      userName={userName}>
      <AnsweredAllContent/>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const userData = await initCookies(ctx);

  let userName =
    userData.account_type === AccountType.REGISTERED ? userData.registered.display_name : null;
  
  return {
    props: {
      userName,
      points: userData.points
    },
  };
}

export default AnsweredAll;
