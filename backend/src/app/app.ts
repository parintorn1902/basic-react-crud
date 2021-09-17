import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AppDatabase from "../database/database";
import * as middleware from "./middleware";
import Config from "../config/config";
import userController from "../components/users/userController";
import studentController from "../components/students/studentController";

const TAG = "\u001b[1;32m";

const createApplication = async () => {
  console.log(`${TAG}:: Create application`);
  const app = express();

  console.log(`${TAG}:: Setup middlewares`);
  app.use(json());
  app.use(cors({ origin: ["http://localhost:3000"] }));
  app.use(cookieParser(Config.SECRET_KEY.COOKIE));
  app.use(middleware.commonMiddleware);
  app.use(middleware.responseTimeMiddleware);
  app.use(middleware.authMiddleware);

  console.log(`${TAG}:: Setup services`);
  app.use(userController);
  app.use(studentController);
  // setup 404 route
  app.use(middleware.notFoundMiddleware);

  console.log(`${TAG}:: Create database connection`);
  await AppDatabase.createConnection();
  // console.log(`${TAG}:: Create initial data in database`);
  // await AppDatabase.initialData();

  return app;
};

export default createApplication;
