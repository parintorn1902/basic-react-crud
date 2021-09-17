import { compareSync } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import Service from "../../app/service";
import Config from "../../config/config";
import UserRepo from "./userDAL";

const userService = new Service();
const userController = userService.getRouter();

userService.post("/api/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await new UserRepo().getUser(username);
  if (!user) {
    throw "Username not found";
  }

  if (compareSync(password, user.password)) {
    // passed
    const secretKeyA = Config.SECRET_KEY.ACCESS_TOKEN;
    const secretKeyB = Config.SECRET_KEY.REFRESH_TOKEN;
    const accessToken = sign({ username: user.username, role: user.role }, secretKeyA, {
      expiresIn: "15m",
    });
    const refreshToken = sign({ username: user.username, role: user.role }, secretKeyB, {
      expiresIn: "30d",
    });
    const cookieOptions = {
      maxAge: 1000 * 60 * 30 * 24 * 30,
      httpOnly: true,
      signed: true,
    };
    res.cookie("pid", refreshToken, cookieOptions);

    return { accessToken };
  } else {
    // failed
    throw "Bad password";
  }
});

export default userController;
