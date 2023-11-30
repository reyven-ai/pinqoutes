import { Response } from "express";

export class NotFoundError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 404;
  }
}

export class NotAuthError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 401;
  }
}

export class BadRequestError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 400;
  }
}

export class InternalServerError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 500;
  }
}

export function handleError(error: any, res: Response) {
  console.error(`Error during operation: ${error.message}`);

  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
  } else if (error instanceof NotAuthError) {
    return res.status(401).json({ message: error.message });
  } else {
    return res.status(500).json({ message: "Internal server error" });
  }
}
