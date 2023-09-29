import { sign } from "jsonwebtoken";
import configs from "../configs";

type TokenPayload = { id: string; user: "client" | "admin" };

/**
 * Creates jwt
 */
export default (payload: TokenPayload): string => {
  return sign({ id: payload.id, user: payload.user }, configs.jwt.secret, {
    expiresIn: configs.jwt.expires_in,
  });
};
