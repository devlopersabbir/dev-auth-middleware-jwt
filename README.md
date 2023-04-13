
███████╗██╗  ██╗███████╗██╗     ██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
  ██╔════╝██║  ██║██╔════╝██║     ██║     ██╔═══██╗██╔══██╗████╗ ████║██╔════╝
  █████╗  ███████║█████╗  ██║     ██║     ██║   ██║██████╔╝██╔████╔██║█████╗  
  ██╔══╝  ██╔══██║██╔══╝  ██║     ██║     ██║   ██║██╔══██╗██║╚██╔╝██║██╔══╝  
  ██║     ██║  ██║███████╗███████╗███████╗╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
  ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝

  # dev-auth-middleware-jwt
A powerful JWT authentication middleware for Node.js to create accesstoken, refreshtoken ans also able to validate both token.

  This middleware provides a simple and secure way to authenticate HTTP requests using JSON Web Tokens (JWTs). It can be easily integrated into any Node.js application and supports a variety of authentication strategies, including bearer tokens and cookie-based authentication. Finaly, this library will help us to generate access & refresh token also able to validate
For more information on how to use the middleware, please refer to the [documentation](https://github.com/devlopersabbir/dev-auth-middleware-jwt#readme).

  [![npm](https://img.shields.io/npm/v/dev-auth-middleware-jwt?style=flat-square&logo=npm)](https://www.npmjs.com/package/dev-auth-middleware-jwt)
  [![npm](https://img.shields.io/npm/l/dev-auth-middleware-jwt?style=flat-square&logo=npm)](https://github.com/devlopersabbir/dev-auth-middleware-jwt/blob/main/LICENSE)
  [![GitHub issues](https://img.shields.io/github/issues/devlopersabbir/dev-auth-middleware-jwt?style=flat-square&logo=github)](https://github.com/devlopersabbir/dev-auth-middleware-jwt/issues)
  [![GitHub stars](https://img.shields.io/github/stars/devlopersabbir/dev-auth-middleware-jwt?style=flat-square&logo=github)](https://github.com/devlopersabbir/dev-auth-middleware-jwt/stargazers)
  [![npm](https://img.shields.io/npm/dt/dev-auth-middleware-jwt?style=flat-square&logo=npm)](https://www.npmjs.com/package/dev-auth-middleware-jwt)


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

Firstly, just import this package using

```ts
import { JWT, Validate } from "dev-auth-middleware-jwt";
```

Now it's ready to use.

If you want you try with this template. I just try to explement this package features and show...

```ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { JwtPayload } from "jsonwebtoken";
dotenv.config();
import { JWT, Validate } from "dev-auth-middleware-jwt";

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

#### Author

This package created by [Sabbir Hossain Shuvo](https://www.showwcase.com/devlopersabbir). And the GitHub profile is [https://github.com/devlopersabbir](https://github.com/devlopersabbir).

#### LICENSE

MIT

For support just [Buy Me A Coffee](https://www.buymeacoffee.com/devlopersabbir)
[https://www.buymeacoffee.com/devlopersabbir](https://www.buymeacoffee.com/devlopersabbir)
