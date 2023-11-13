import validator from "validator";

class EmailFormatError extends Error {
  constructor() {
    super("Invalid email format");
    this.name = "EmailFormatError";
  }
}

class PasswordRequirementsError extends Error {
  constructor() {
    super("Password does not meet requirements");
    this.name = "PasswordRequirementsError";
  }
}

class UserAlreadyRegisteredError extends Error {
  constructor() {
    super("Email is already registered");
    this.name = "UserAlreadyRegisteredError";
  }
}

function isEmailValid(email: string) {
  return validator.isEmail(email);
}

function isPasswordValid(password: string) {
  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  return true;
}

export {
  isEmailValid,
  isPasswordValid,
  EmailFormatError,
  PasswordRequirementsError,
  UserAlreadyRegisteredError,
};
