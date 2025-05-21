import express from "express";
 import { config } from "./constants/config";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./configs/mysql";
 import morgan from "morgan";
const app = express();
const port = config.PORT ?? 4000;
import router from "./routes"
import { formatResponse } from "./utils";
 
app.use(morgan("dev"))
app.use(cors<cors.CorsRequest>());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/health", (_, res) =>
  formatResponse(res, { message: "Okay", data: null })
);
app.use("/", router);
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
     app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
     });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
