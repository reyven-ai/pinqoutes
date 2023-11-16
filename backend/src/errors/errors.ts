class NotFoundError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 404;
  }
}

class NotAuthError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 401;
  }
}

class BadRequestError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 400;
  }
}

class InternalServerError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 500;
  }
}

export { NotAuthError, NotFoundError, BadRequestError, InternalServerError };
