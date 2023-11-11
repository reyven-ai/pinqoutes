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
