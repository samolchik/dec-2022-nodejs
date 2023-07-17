import http from "node:http";

import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import * as mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket: Socket) => {
  // console.log("id_socket:", socket.id);
  // console.log("handshake:", socket.handshake);

  // ---------------- ONE TO ONE -----------------------
  socket.on("message:create", (messageData) => {
    console.log("Message Data:", messageData);

    // ONE-TO-ONE MESSAGE
    socket.emit("message:receive", { ok: true });
  });

  // ---------------- BROADCAST --------------------
  socket.on("broadcast:all", () => {
    // Send to all connected sockets
    // io.emit("alert", "Повітряна тривога!");

    // Send to all connected sockets EXCEPT SENDER
    socket.broadcast.emit("alert", "Повітряна тривога!");
  });

  // ---------------- ROOM --------------------
  socket.on("room:joinUser", ({ roomId }) => {
    socket.join(roomId); //JOIN ROOM
    // socket.leave(roomId); //LEAVE ROOM

    io.to(roomId).emit("room:newUserAlert", socket.id);
  });
});

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

// --- ERROR HANDLER ---
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

server.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});
