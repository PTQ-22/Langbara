import express from 'express';
import { logger } from '../../../../logger';
import { CheckResult, checkUserCredentialsEncrypted } from '../../../../logic/user-credentials';

interface AuthCookieQuery extends express.Request {
  query: {
    authcookie: string;
  };
}

async function checkIfUserIsLoggedIn( 
  req: AuthCookieQuery,
  res: express.Response,
  next: express.NextFunction
) {

  const cookie = req.query.authcookie;

  if(!cookie) {
    logger.debug("NO COOKIE")
    res.status(403).send('');
    return;
  }

  
  const checkResult = await checkUserCredentialsEncrypted(cookie);

  if(checkResult === CheckResult.CORRECT) {
    next();
  } else {
    logger.debug("FUCK IT")
    res.status(403).send('');
    return;
  }
}

export const middleware = checkIfUserIsLoggedIn;