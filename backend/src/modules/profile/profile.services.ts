import { NotFoundError } from "../../errors/errors";
import { UserDetailsRepository } from "./profile.repository";

import { UserProfileData } from "./profile.types";

export async function add(data: UserProfileData): Promise<UserProfileData> {
  try {
    const userRepository = new UserDetailsRepository();
    const createdUserProfile: UserProfileData =
      await userRepository.createUserProfile(
        data.user_id,
        data.username,
        data.description,
        data.country_of_residence,
        data.mobile_phone_number,
        data.birthdate
      );

    return createdUserProfile;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user profile.");
  }
}

export async function update(
  user_id: number,
  data: UserProfileData
): Promise<UserProfileData | null> {
  try {
    const userProfile = await getSelfProfile(user_id);
    if (!userProfile) {
      throw new NotFoundError(`User profile with ID ${user_id} not found.`);
    }
    const userRepository = new UserDetailsRepository();
    const updatedUserProfile = await userRepository.updateUserProfile(
      user_id,
      data
    );

    if (!updatedUserProfile) {
      return null;
    }

    return updatedUserProfile;
  } catch (error) {
    console.error(error);
    throw new Error(`Error updating user profile with ID ${user_id}.`);
  }
}

export async function getSelfProfile(
  user_id: number
): Promise<UserProfileData | null> {
  try {
    const userRepository = new UserDetailsRepository();
    const getSelfUserProfile = await userRepository.getSelfUSerProfile(user_id);

    if (!getSelfUserProfile) {
      return null;
    }

    return getSelfUserProfile;
  } catch (error) {
    console.error(error);
    throw new NotFoundError(
      `Error retrieving user profile with ID ${user_id}.`
    );
  }
}

export async function remove(user_id: string): Promise<UserProfileData | null> {
  try {
    const userRepository = new UserDetailsRepository();

    const deletedProfile = await userRepository.deleteUserProfile(user_id);

    if (!deletedProfile) {
      return null;
    }
    return deletedProfile;
  } catch (error) {
    console.error(error);
    throw new NotFoundError(`Error deleting user profile with ID ${user_id}.`);
  }
}
