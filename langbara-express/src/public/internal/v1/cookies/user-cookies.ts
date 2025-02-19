import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as userCookies from "../../../../logic/user-cookies";
import { checkUserCredentials, checkUserCredentialsEncrypted, CheckResult } from "../../../../logic/user-credentials";

export const router = express.Router();

router.get("/new", async (req: express.Request, res: express.Response) => {
  const uid = uuidv4();
  const cookie = userCookies.newEncryptedUserCookie(uid);
  res.status(200).json({
    auth: cookie,
  });
});

interface GetCookieRequest extends express.Request {
  query: {
    cookie: string | undefined;
  };
}

router.get("/get", async (req: GetCookieRequest, res: express.Response) => {
  const cookie = req.query.cookie;
  if (typeof cookie === "string") {
    const data = userCookies.decryptUserCookie(cookie);
    if (typeof data !== "undefined") {

      if(data.account_type === userCookies.AccountType.REGISTERED) {
        const checkResult = await checkUserCredentials({uid: data.uid, passwd: data.registered.passwd});
        if(checkResult !== CheckResult.CORRECT) {
          res.status(200).json({
            msg: "Invalid cookie!"
          });
          return;
        }
      }
      
      res.status(200).json({...data, msg: "OK"});
    } else {
      res.status(200).json({
        msg: "Invalid cookie!",
      });
    }
  } else {
    res.status(200).json({
      msg: "No Cookie query param provided!",
    });
  }
});
