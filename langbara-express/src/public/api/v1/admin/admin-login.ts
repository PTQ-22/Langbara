import express from "express";
import {
  checkAdminCredentialsForLogin,
  CheckResult,
  encryptAdminCredentials,
} from "../../../../logic/admin-credentials";

export const router = express.Router();

interface LoginRequestBody extends express.Request {
  body: {
    login: string;
    passwd: string;
    token2FA: string;
  };
}

router.post("/login", async (req: LoginRequestBody, res: express.Response) => {
  if (!req.body || !req.body.login || !req.body.passwd) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  if (req.body.login.length > 30 || req.body.passwd.length > 200) {
    res.setHeader("api-code", 1001);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const { login, passwd, token2FA } = req.body;

  const checkResult = await checkAdminCredentialsForLogin({
    name: login,
    passwd: passwd,
    token2FA: token2FA,
  });

  if (checkResult === CheckResult.CORRECT) {
    const encrypted = encryptAdminCredentials({ name: login, passwd: passwd });
    res.setHeader("api-code", 0);
    res.status(200).json({
      msg: "Success",
      cookies: {
        adminauth: encrypted,
      },
    });
  } else if (checkResult === CheckResult.INVALID_LOGIN) {
    res.setHeader("api-code", 4000);
    res.status(200).json({
      msg: "Invalid login or password",
    });
  } else if (checkResult === CheckResult.INVALID_PASSWD) {
    res.setHeader("api-code", 4001);
    res.status(200).json({
      msg: "Invalid login or password",
    });
  } else if (checkResult === CheckResult.TOKEN_2FA_REQUIRED) {
    res.setHeader("api-code", 4002);
    res.status(200).json({
      msg: "2FA token required",
    });
  } else if (checkResult === CheckResult.INVALID_2FA_TOKEN) {
    res.setHeader("api-code", 4003);
    res.status(200).json({
      msg: "Invalid 2fa token",
    });
  } else {
    res.status(500);
  }
});
