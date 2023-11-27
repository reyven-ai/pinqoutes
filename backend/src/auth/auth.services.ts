import { hash } from "bcrypt";
import UserRepository from "./auth.repository";
import { NotFoundError } from "../errors/errors";
import { UserAuthData, UserAuthToken } from "./auth.types";
import { sign } from "jsonwebtoken";
import { config } from "../config";

const KEY: string = config.JWT_SECRET;

export function createJSONToken(user: UserAuthToken): string {
  console.log("<<<<< UserID", user);
  return sign({ email: user.email, user_id: user.user_id }, KEY, {
    expiresIn: "1h",
  });
}

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
