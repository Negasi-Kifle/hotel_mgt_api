import { config } from "dotenv";
config({ path: ".env" });

// Store all env variables in one object
export default {
  env: process.env.NODE_ENV,
  mongoDB: <string>process.env.MONGO_DB,
  jwt: {
    secret: <string>process.env.JWT_SECRET,
    expires_in: <string>process.env.JWT_EXPIRES_IN,
  },
};
