import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import cookieparser from "cookie-parser";
import { logger } from "./logger";
import e from "express";

export const app = express();
const port = 8000;

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWD,
  user: process.env.DB_USER,
});

function load(startPath: string, currentPath?: string | undefined) {
  if(typeof(currentPath) === 'undefined') {
    currentPath = startPath;
  }

  const middleWareModulePath = './public' + path.join(currentPath, '_middleware').replace(startPath, "").replace(/\\/g, '/');
  try {
    const middlewareModule = require(middleWareModulePath);

    
    let middlewarePath = currentPath.replace(startPath, "").replace(/\\/g, '/');
    if(middlewarePath === '') {
      middlewarePath = '/';
    }

    if(! ('middleware' in middlewareModule)) {
      logger.error("_middleware file in ", currentPath, "found but no middleware was exported")
    }

    app.use(middlewarePath, middlewareModule.middleware);
    logger.info("Loaded middleware ", middlewarePath);
  } catch(e) { } // module doesnt exist; leaving catch block empty 
  

  fs.readdirSync(currentPath).forEach((file) => {
    if(!file.startsWith('_')) {
      const absolutePath = path.join(currentPath!, file);
      const type = fs.lstatSync(absolutePath);
      if(type.isDirectory()) {
        load(startPath, absolutePath);
      }
      else {
        const pathToFile = absolutePath.replace(startPath, "").replace(/\\/g, '/');
        const endpointUrl = pathToFile.replace(file, "").replace(/\\/g, '/');
        let module = require("./public" + pathToFile);

        if('router' in module) {
          app.use(endpointUrl, module.router);
        
          logger.info("Loaded ", pathToFile);
        } else {
          logger.error("endpoint file in ", path.join(currentPath!, file), "found but no router was exported")
        }
  
      }
    }
  })
}

load(path.join(__dirname, "public"));

app.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("");
});

// jest unit tests should not listen on port to work properly
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
}
