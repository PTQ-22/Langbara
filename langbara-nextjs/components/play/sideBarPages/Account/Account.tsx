import {
  Column,
  Info,
  InfoGroup,
  InfoIcon,
  InfoText,
  MaxWidthColumn,
  Subtitle,
  TextHeader,
  Title,
} from "../../../../styles/sideBarPages/sideBarPages.styles";
import Link from "next/link";

const Account = () => {
  return (
    <Column center={false}>
      <TextHeader>
        <Title>KONTO</Title>
      </TextHeader>
      <MaxWidthColumn>
        <Subtitle>Ogólne</Subtitle>
        <InfoGroup>
          <Link href={"/user/change-name"}>
            <Info>
              <InfoText>Nazwa usera</InfoText>
              <InfoIcon src="/assets/edit_icon.svg" />
            </Info>
          </Link>
          <Link href={"/user/delete-account"}>
            <Info>
              <InfoText>Usuń konto</InfoText>
              <InfoIcon src="/assets/bin.svg" />
            </Info>
          </Link>
        </InfoGroup>

        <Subtitle>Bezpieczeństwo</Subtitle>
        <InfoGroup>
          <Link href={"/user/password"}>
            <Info>
              <InfoText>Zmiana hasła</InfoText>
              <InfoIcon src="/assets/edit_icon.svg" />
            </Info>
          </Link>
          <Link href={"/user/2fa"}>
            <Info>
              <InfoText>Weryfikacja dwuetapowa</InfoText>
              <InfoIcon src="/assets/two_factor_icon.svg" />
            </Info>
          </Link>
        </InfoGroup>
      </MaxWidthColumn>
    </Column>
  );
};

export default Account;
