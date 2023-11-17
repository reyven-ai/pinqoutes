import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import authRoutes from "./auth/auth.route";
import userRoutes from "./user/checkAuth.route";
import profileRoutes from "./userDetails/userDetails.route";
import cors = require("cors");
// import { checkAuthMiddleware } from "./auth/auth.controllers";

const PORT = 3000;

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);

app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
