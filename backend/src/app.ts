import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import userAuthRoutes from "./auth/auth.route";
// import userRoutes from "./checkAuthMiddleware/checkAuth.route";
import userProfileDetailsRoutes from "./userDetails/userDetails.route";
import cors = require("cors");

const PORT = 3000;

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", userAuthRoutes);
// app.use("/user", userRoutes);
app.use("/profile", userProfileDetailsRoutes);

app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
