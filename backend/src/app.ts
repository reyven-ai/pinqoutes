import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import express, { Response, NextFunction } from "express";
import { json } from "body-parser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./modules/auth/auth.route";
import profileRoutes from "./modules/profile/profile.route";
import likeRoutes from "./modules/likes/likes.route";
import commentRoutes from "./modules/comments/comment.route";
import followRoutes from "./modules/follows/follows.route";
import notificationsRoutes from "./modules/notifications/notifications.route";
import pinRoutes from "./modules/pin/pin.route";
import saveRoutes from "./modules/save/save.route";
import usersRoute from "./modules/users/users.route";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(compression());
app.use(json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// Use your routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/follows", followRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/pins", pinRoutes);
app.use("/saves", saveRoutes);
app.use("/users", usersRoute);

app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("like", (data) => {
    io.emit("like", data);
  });

  socket.on("unlike", (data) => {
    io.emit("unlike", data);
  });

  socket.on("comment", (data) => {
    io.emit("comment", data);
  });

  socket.on("save", (data) => {
    io.emit("save", data);
  });

  socket.on("follow", (data) => {
    io.emit("follow", data);
  });

  socket.on("following", (data) => {
    io.emit("following", data);
  });

  socket.on("unfollow", (data) => {
    io.emit("unfollow", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
