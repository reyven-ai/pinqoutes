import { hash } from "bcrypt";
import UserRepository from "./auth.repository";
import { NotFoundError } from "../errors/errors";
import { UserAuthData } from "./auth.types";

export async function add(data: {
  email: string;
  password: string;
}): Promise<{ user_id: number; email: string }> {
  const hashedPw: string = await hash(data.password, 10);

  try {
    const userRepository = new UserRepository();
    const createdUserId = await userRepository.createUser(data.email, hashedPw);

    return { user_id: createdUserId, email: data.email };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user");
  }
}

export async function get(email: string): Promise<UserAuthData> {
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
