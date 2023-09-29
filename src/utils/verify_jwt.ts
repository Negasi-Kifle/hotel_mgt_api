import { JwtPayload, verify } from "jsonwebtoken";
import configs from "../configs";

// Interface for the payload after the jwt being decoded
interface ExpectedJWTPayload extends JwtPayload {
  id: string;
  user: "client" | "admin";
}

/**
 * Verifies JWT
 */
export default (token: string): ExpectedJWTPayload => {
  return verify(token, configs.jwt.secret) as ExpectedJWTPayload;
};
