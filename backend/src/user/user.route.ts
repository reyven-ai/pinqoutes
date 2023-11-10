import { Router, Request, Response, NextFunction } from "express";

const router = Router();

const getJwtToken = (authHeader: string | undefined) => {
  const splitHeader = authHeader?.split(" ") || [];

  if (splitHeader.length != 2 || splitHeader[0] !== "Bearer") {
    return null;
  }

  return splitHeader[1];
};

// Middleware that checks JWT token validity for protected routes
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Req headers:", req.headers);

  // get the JWT token from Authorization header
  const authHeader = req.headers.authorization;
  const token = getJwtToken(authHeader);

  console.log("token:", token);

  // Validarte that JWT is valid

  // If not — throw 401 error
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get user ID from the JWT and add it to context (mb on Req?)

  next();
};

// TODO: create protected middleware
router.get("/user-profile", authMiddleware, async (req, res) => {
  return res.json({
    status: "success",
  });
});

export default router;
