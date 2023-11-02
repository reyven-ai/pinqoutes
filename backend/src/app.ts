import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import usersAuth from "./auth/auth.route";
import cors = require("cors");

const app = express();

app.use(json());
app.use(cors());

app.use("/", usersAuth);

app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(3000);
