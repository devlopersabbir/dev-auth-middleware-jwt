# dev-auth-middleware-jwt

This library will help us to generate access & refresh token also able to validate"

## Installation

`console
$ npm i dev-auth-middleware-jwt --save
`
or if you are use `yarn` then just run this code
`console
$ yarn add dev-auth-middleware-jwt --save
`

## Use

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
