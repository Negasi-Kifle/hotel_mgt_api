import { config } from "dotenv";
config({ path: ".env" });

// Store all env variables in one object
export default {
  mongoDB: <string>process.env.MONGO_DB,
};
