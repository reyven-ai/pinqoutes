import { v4 as generateId } from "uuid";
import { UserDetailsRepository } from "./user.repository";
import { NotFoundError } from "../errors/errors";
import { UserProfile } from "../models/types";

async function add(data: UserProfile): Promise<{ id: string }> {
  try {
    const userRepository = new UserDetailsRepository();
    const createdUserId = await userRepository.createUserProfile(
      data.username,
      data.description,
      data.country_of_residence,
      data.mobile_phone_number,
      data.birthdate
    );

    return { id: createdUserId };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user");
  }
}

async function update(userId: string, data: UserProfile): Promise<void> {
  try {
    const userRepository = new UserDetailsRepository();
    // Assuming you have an update method in your repository
    await userRepository.updateUserProfile(userId, data);
  } catch (error) {
    console.error(error);
    throw new Error(`Error updating user with ID ${userId}`);
  }
}

async function get(userId: string): Promise<UserProfile | null> {
  try {
    const userRepository = new UserDetailsRepository();
    // Assuming you have a getUserProfile method in your repository
    const userProfile = await userRepository.getUserProfileById(userId);
    return userProfile;
  } catch (error) {
    console.error(error);
    throw new Error(`Error retrieving user profile with ID ${userId}`);
  }
}

async function remove(userId: string): Promise<void> {
  try {
    const userRepository = new UserDetailsRepository();
    // Assuming you have a delete method in your repository
    await userRepository.deleteUserProfile(userId);
  } catch (error) {
    console.error(error);
    throw new Error(`Error deleting user with ID ${userId}`);
  }
}

export { add, update, remove, get };
