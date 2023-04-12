import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: any;
  }
}

class Validate {
  /**
   * @param req
   * @param res
   * @param next
   *
   * @description Validate our access token which we have in cookies or header
   */
  public static accessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let bearerToken = req.headers.authorization ?? req.cookies?.accessToken;

    if (!bearerToken?.startsWith("Bearer "))
      return res.status(401).json({ message: "🤐 Unauthorizede!" });

    const token = bearerToken.split(" ")[1];

    verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (error: any, decoded: any) => {
        console.log(error);
        if (error)
          return res.status(403).json({ message: "🥴 Forbidden!", error });

        req.user = decoded;
        next();
      }
    );
  };
  /**
   * @param req
   * @param res
   * @param next
   *
   * @description
   * Validate our refresh token which we have in cookies or header
   */
  public static refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let bearerToken =
      (req.headers.accessToken || req.headers.authorization) ??
      req.cookies.accessToken;

    if (!bearerToken?.startsWith("Bearer "))
      return res.status(401).json({ message: "🤐 Unauthorizede!" });

    const token = bearerToken.split(" ")[1];

    verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      (error: any, decoded: any) => {
        if (error) {
          return res.status(403).json({ message: "🥴 Forbidden!", error });
        }
        req.user = {
          id: decoded.user,
          token,
        };
        next();
      }
    );
  };
}
export default Validate;
