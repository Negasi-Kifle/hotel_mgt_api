import http from "http";
import app from "./server";
import mongoDB from "./mongoDB";

/**
 * Creates the http server
 */
export default () => {
  const httpServer = http.createServer();
  const port = process.env.PORT || 300;
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  const mongo = mongoDB();

  // Majestic close
  process.on("SIGINT", () => {
    console.log("Closing Server");
    httpServer.close();
    console.log("Closing MongoDB");
    mongo.close();
  });
};
