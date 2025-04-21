import express from "express";
import { createApolloMiddleware } from "./services/apollo";
import { config } from "./constants/config";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./configs/mysql";
const app = express();
const port = config.PORT ?? 4000;
app.use(cors<cors.CorsRequest>());
app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    return createApolloMiddleware();
  })
  .then((apolloMiddleware) => {
    app.use("/graphql", express.json(), bodyParser.json(), apolloMiddleware);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
