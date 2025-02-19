import { useState } from "react";
import QRCode from "react-qr-code";
import { API_URL } from "../../data/constants";
import { Wrapper } from "../../styles/admin/2fa.styles";
import { Enable2FAForm, Disable2FAForm } from "./FormsAdmin2FA";
import Button from "../helpers/Button";
import { parseCookies } from "nookies";

const API_ADMIN_2FA_ENDPOINT = `${API_URL}/admin/2fa`;
const API_USER_2FA_ENDPOINT = `${API_URL}/user/2fa`;

export enum AccountType2FA {
  ADMIN,
  USER,
}

interface Props {
  is2FA: boolean;
  accountID: string;
  accountType: AccountType2FA;
}

const TwoFactorAuth = ({ is2FA, accountID, accountType }: Props) => {
  const [secret, setSecret] = useState<string>("");
  const [disabling2FA, setDisabling2FA] = useState<boolean>(false);
  const ENDPOINT_URL =
    accountType === AccountType2FA.ADMIN
      ? API_ADMIN_2FA_ENDPOINT
      : API_USER_2FA_ENDPOINT;

  const cookies = parseCookies();

  const handleEnable2FA = async () => {
    const bodyObj =
      accountType === AccountType2FA.ADMIN
        ? { name: accountID }
        : { uid: accountID };
      
    console.log(bodyObj);
    const response = await fetch(`${ENDPOINT_URL}/register?authcookie=${cookies.auth || 'dupa'}&adminauth=${cookies.adminauth || 'dupa'}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyObj)
    });
    setSecret((await response.json()).secret);
  };

  return (
    <Wrapper>
      <h2>Aplikacja Authenticator</h2>
      {secret ? (
        <>
          <QRCode value={secret} />
          <h4>Zeskanuj kod QR aplikacją Authenticator</h4>
          <h5>A następnie wpisz 6-cyfrowy kod z aplikacji</h5>
          <Enable2FAForm
            accountID={accountID}
            setSecret={setSecret}
            accountType={accountType}
            ENDPOINT_URL={ENDPOINT_URL}
          />
        </>
      ) : is2FA === true ? (
        disabling2FA ? (
          <Disable2FAForm
            accountID={accountID}
            setDisabling2FA={setDisabling2FA}
            accountType={accountType}
            ENDPOINT_URL={ENDPOINT_URL}
          />
        ) : (
          <Button
            color="rgba(255,255,255"
            onClick={() => setDisabling2FA(true)}
          >
            Wyłącz
          </Button>
        )
      ) : (
        <Button color="rgba(179, 197, 42" onClick={handleEnable2FA}>
          Włącz
        </Button>
      )}
    </Wrapper>
  );
};

export default TwoFactorAuth;
