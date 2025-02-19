import express from 'express';
import { logger } from '../../../../logger';
import { checkAdminCredentialsEncrypted, CheckResult } from '../../../../logic/admin-credentials';

async function checkIfAdminIsLoggedIn( 
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {

  if (req.method === "OPTIONS") {
    res.status(200).send('');
    return;
  }

  // do not check creds for login endpoint
  if(req.path === '/login') {
    next();
    return;
  }

  const cookie = req.cookies['adminauth'];

  if(!cookie) {
    res.status(403).send('');
    return;
  }

  
  const checkResult = await checkAdminCredentialsEncrypted(cookie);

  if(checkResult === CheckResult.CORRECT) {
    next();
  } else {
    res.status(403).send('');
    return;
  }
}

export const middleware = checkIfAdminIsLoggedIn;