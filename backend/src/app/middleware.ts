import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import responseTime from "response-time";
import Config from "../config/config";

const publicUrls = ["/api/login"];

export const commonMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`\u001b[1;34m:: Request method : ${req.method}`);
  console.log(`\u001b[1;34m:: Request url : ${req.originalUrl}`);
  console.log(`\u001b[1;34m:: Request body : ${JSON.stringify(req.body)}`);
  next();
};

export const responseTimeMiddleware = responseTime((req, res, time) => {
  let prefixColor = "\u001b[1;32m";
  if (time > 100) {
    prefixColor = "\u001b[1;33m";
  }
  console.log(`${prefixColor}:: Response time : ${Math.round(time).toFixed(0)} ms.`);
});

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (publicUrls.includes(req.originalUrl)) {
    next();
  } else {
    // require authentication
    let decoded;
    let decodeSucess = true;
    try {
      const token = req.headers.authorization?.split(" ")[1];
      decoded = verify(token, Config.SECRET_KEY.ACCESS_TOKEN);
    } catch (error) {
      decodeSucess = false;
    }

    if (decodeSucess && decoded) {
      // passed
      next();
    } else {
      // failed, token expired or wrong token
      res.status(401).send("Unauthorized User");
    }
  }
};

export const notFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Service not found");
};
