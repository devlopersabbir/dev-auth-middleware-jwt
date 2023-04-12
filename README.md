# dev-auth-middleware-jwt

[![npm version](https://badge.fury.io/js/dev-auth-middleware-jwt.svg)](https://badge.fury.io/js/dev-auth-middleware-jwt)
[![GitHub license](https://img.shields.io/github/license/devlopersabbir/dev-auth-middleware-jwt)](https://github.com/devlopersabbir/dev-auth-middleware-jwt/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/devlopersabbir/dev-auth-middleware-jwt)](https://github.com/devlopersabbir/dev-auth-middleware-jwt/issues)
[![GitHub stars](https://img.shields.io/github/stars/devlopersabbir/dev-auth-middleware-jwt)](https://github.com/devlopersabbir/dev-auth-middleware-jwt/stargazers)

This library will help us to generate access & refresh token also able to validate

## INSTALLATION

```console
$ npm i dev-auth-middleware-jwt --save
```

or if you are use `yarn` then just run this code

```console
$ yarn add dev-auth-middleware-jwt --save
```

## REQUIRED TASK

- We have to create a `.env` file into the root project directory for store our all of `environment` variable.
- Create all variable following the down below code example.

```console
ACCESS_TOKEN_SECRET=key //use your secret key
ACCESS_TOKEN_EXPIRES_IN=1d //modify as you need eg: 60s, 1m, 1h, 7d

REFRESH_TOKEN_SECRET=key //use your secret key
REFRESH_TOKEN_EXPIRES_IN=1d //modify as you need eg: 60s, 1m, 1h, 7d
```

- That is required

## USAGES

If you want you try with this template. I just try to explement this package features and show...

```ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Validate from "./middlewares/auth";
import JWT from "./service/jwtService";
import { JwtPayload } from "jsonwebtoken";
dotenv.config();

declare module "express" {
  interface Request {
    user?: any;
  }
}

const app = express();
app.use(express.json());

let refreshTokens: any = [];
app.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const payload: JwtPayload = {
      id: "4234124123423535",
      username,
    };
    const accessToken = JWT.generateAccessToken(payload);
    const refreshToken = JWT.generateRefreshToken(payload);
    refreshTokens.push(refreshToken);

    // response
    res.status(200).json({
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!", error });
  }
});

app.post("/pro", Validate.accessToken, async (req: Request, res: Response) => {
  if (req.user) {
    res.json({
      data: {
        user: req.user,
      },
    });
  } else {
    res.json({ data: { message: "User not found" } });
  }
});

app.post(
  "/get-ref",
  Validate.refreshToken,
  async (req: Request, res: Response) => {
    console.log(req.user);
    if (req.user) {
      res.json({
        data: {
          user: req.user,
        },
      });
    } else {
      res.json({ data: { message: "User not found" } });
    }
  }
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server is running at ${PORT}`));
```
