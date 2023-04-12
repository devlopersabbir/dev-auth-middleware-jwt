import { sign } from "jsonwebtoken";

class JWT {
  /**
   * @Description
   * Generate access token with user information
   * @payload
   */
  public static generateAccessToken = (payload: object) => {
    return sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}`,
    });
  };

  /**
   * @Description
   * Generate refresh token with user information
   * @payload
   */
  public static generateRefreshToken = (payload: object) => {
    console.log(payload);
    return sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}`,
    });
  };
}
export default JWT;
