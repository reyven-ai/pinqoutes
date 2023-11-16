import { hash } from "bcrypt";
import { v4 as generateId } from "uuid";
import UserRepository from "./auth.repository";
import { NotFoundError } from "../errors/errors";

interface UserData {
  email: string;
  password: string;
}

async function add(data: UserData): Promise<{ id: string; email: string }> {
  const userId: string = generateId();
  const hashedPw: string = await hash(data.password, 10);

  try {
    const userRepository = new UserRepository();
    const createdUserId = await userRepository.createUser(data.email, hashedPw);

    return { id: createdUserId, email: data.email };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user");
  }
}

async function get(email: string): Promise<UserData> {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundError("Could not find user for email " + email);
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user by email");
  }
}

export { add, get };

// import bcrypt from "bcrypt";
// import UserRepository from "./auth.repository";
// import {
//   isEmailValid,
//   isPasswordValid,
//   EmailFormatError,
//   PasswordRequirementsError,
//   UserAlreadyRegisteredError,
// } from "./auth.validation";

// const userRepository = new UserRepository();

// class UserService {
//   async getByEmail(email: string) {
//     return await userRepository.getByEmail(email);
//   }

//   async signup(email: string, password: string) {
//     if (!isEmailValid(email)) {
//       throw new EmailFormatError();
//     }

//     if (!isPasswordValid(password)) {
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
//   UserAlreadyRegisteredError,
//   PasswordRequirementsError,
//   EmailFormatError,
// };
