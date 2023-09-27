import mongoose, { Connection } from "mongoose";
import configs from "../configs";

/**
 * Connects to mongo db
 */
export default (): Connection => {
  mongoose
    .connect(configs.mongoDB)
    .then(() => {
      console.log("Connected to mongoDB successfully");
    })
    .catch((err) => {
      console.log("Error while connecting to mongoDB");
      console.log(err);
    });

  const db = mongoose.connection;

  // Listen for various events
  db.on("error", (err: Error) => {
    console.log(err);
  });

  db.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  // Return mongodb connection
  return db;
};
