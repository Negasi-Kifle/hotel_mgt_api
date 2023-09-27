import http from "http";
import app from "./server";
import mongoDB from "./mongoDB";

/**
 * Creates the http server
 */
export default () => {
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV}`);
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
