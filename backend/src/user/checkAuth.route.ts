import { Router, Request, Response } from "express";
import { checkAuthMiddleware } from "../auth/auth.controllers";

interface TokenPayload {
  email: string;
}

interface ExtendedRequest<T> extends Request {
  token?: T;
}

const router = Router();

router.get(
  "/user-profile",
  checkAuthMiddleware,
  (req: ExtendedRequest<TokenPayload>, res: Response) => {
    res.json({ message: "create profile.", user: req.token });
  }
);

export default router;
