import { StyledCard, Container } from "../../styles/admin/index.styles";
import Image from "next/image";
import Link from "next/link";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { NextPageContext } from "next";
import { getAdminData } from "../../logic/admin-cookies";

interface CardProps {
  svgPath: string;
  label: string;
  toPath: string;
}

const Card = ({ svgPath, label, toPath }: CardProps) => {
  return (
    <Link href={toPath}>
      <StyledCard>
        <Image src={svgPath} width={120} height={120} />
        <p>{label}</p>
      </StyledCard>
    </Link>
  );
};

interface MainAdminPageProps {
  adminName: string;
}

const MainAdminPage = ({ adminName }: MainAdminPageProps) => {
  return (
    <AdminLayout isMain adminName={adminName}>
      <Container>
        <Card svgPath="/assets/eye.svg" label="Dodaj admina" toPath="/admin/add-admin" />
        <Card svgPath="/assets/fingerprint.svg" label="Password" toPath="/admin/password" />
        <Card svgPath="/assets/qrcode.svg" label="2FA" toPath="/admin/2fa" />
        {/* <Card svgPath="/assets/people.svg" label="Users" toPath="/admin/userslist" /> */}
        <Card
          svgPath="/assets/calendar.svg"
          label="Kalendarz"
          toPath="/admin/taskcalendar"
        />
        <Card
          svgPath="/assets/wordlist.svg"
          label="Words list"
          toPath="/admin/wordslist"
        />
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const admin = await getAdminData(ctx);

  if (!admin.isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
    };
  }

  return {
    props: {
      adminName: admin.name,
    },
  };
}

export default MainAdminPage;
