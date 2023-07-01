import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
});

app.use("*", apiLimiter);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});
