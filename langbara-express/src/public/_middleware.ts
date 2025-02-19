import express from 'express';
import { accessLogger } from '../logger';

async function accessLoggerMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // if(req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1') { // for debugging
    res.set("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.set("Access-Control-Allow-Credentials", 'true');
    res.set("Access-Control-Allow-Headers", 'Content-Type');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTION");
    res.set("access-control-expose-headers", "api-code");
  // }
  // else {
  //   res.set("Access-Control-Allow-Origin", 'http://192.168.1.17:3000');
  //   res.set("Access-Control-Allow-Credentials", 'true');
  //   res.set("Access-Control-Allow-Headers", 'Content-Type');
  //   res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  //   res.set("access-control-expose-headers", "api-code");
  // }

  res.on("finish", () => {
    const apiCode = res.get("api-code") || -1;
    if (apiCode === -1) {
      accessLogger.info(
        req.ip,
        req.method,
        req.originalUrl,
        res.statusCode,
        req.headers["user-agent"]
      );
    } else {
      accessLogger.info(
        req.ip,
        req.method,
        req.originalUrl,
        res.statusCode,
        "API-CODE:",
        apiCode,
        req.headers["user-agent"]
      );
    }
  });
  next();
}

export const middleware = accessLoggerMiddleware;