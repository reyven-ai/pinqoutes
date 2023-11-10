import bcrypt from "bcrypt";
import UserRepository from "./auth.repository";
import {
  isEmailValid,
  isPasswordValid,
  EmailFormatError,
  PasswordRequirementsError,
  UserAlreadyRegisteredError,
} from "./auth.validation";

const userRepository = new UserRepository();

class UserService {
  async getByEmail(email: string) {
    return await userRepository.getByEmail(email);
  }

  async signup(email: string, password: string) {
    if (!isEmailValid(email)) {
      throw new EmailFormatError();
    }

    if (!isPasswordValid(password)) {
      throw new PasswordRequirementsError();
    }

    const existingUser = await userRepository.getByEmail(email);

    if (existingUser) {
      throw new UserAlreadyRegisteredError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = await userRepository.createUser(email, hashedPassword);

    return user_id;
  }
}

export {
  UserService,
  UserAlreadyRegisteredError,
  PasswordRequirementsError,
  EmailFormatError,
};

// import bcrypt from "bcrypt";
// import UserRepository from "./auth.repository";
// import validator from "validator";

// const userRepository = new UserRepository();

// class EmailFormatError extends Error {
//   constructor() {
//     super("Invalid email format");
//     this.name = "EmailFormatError";
//   }
// }

// class PasswordRequirementsError extends Error {
//   constructor() {
//     super("Password does not meet requirements");
//     this.name = "PasswordRequirementsError";
//   }
// }

// class UserAlreadyRegisteredError extends Error {
//   constructor() {
//     super("Email is already registered");
//     this.name = "UserAlreadyRegisteredError";
//   }
// }

// class UserService {
//   isEmailValid(email: string) {
//     return validator.isEmail(email);
//   }
//   isPasswordValid(password: string) {
//     if (password.length < 8) {
//       return false;
//     }
//     if (!/[A-Z]/.test(password)) {
//       return false;
//     }
//     if (!/\d/.test(password)) {
//       return false;
//     }
//     return true;
//   }

//   async getByEmail(email: string) {
//     return await userRepository.getByEmail(email);
//   }

//   async signup(email: string, password: string) {
//     if (!this.isEmailValid(email)) {
//       throw new EmailFormatError();
//     }

//     if (!this.isPasswordValid(password)) {
//       throw new PasswordRequirementsError();
//     }

//     const existingUser = await userRepository.getByEmail(email);

//     if (existingUser) {
//       throw new UserAlreadyRegisteredError();
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user_id = await userRepository.createUser(email, hashedPassword);

//     return user_id;
//   }
// }

// export {
//   UserService,
//   EmailFormatError,
//   PasswordRequirementsError,
//   UserAlreadyRegisteredError,
// };
