import { InternalServerError } from "../../errors/errors";
import { UserDetailsRepository } from "./profile.repository";

import {
  CreateProfileInput,
  ProfileData,
  UpdateProfileInput,
} from "./profile.types";

export async function createProfile(
  data: CreateProfileInput
): Promise<CreateProfileInput> {
  try {
    const userRepository = new UserDetailsRepository();
    const createdUserProfile: CreateProfileInput =
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

export async function updateProfile(
  userId: number,
  data: UpdateProfileInput
): Promise<UpdateProfileInput | null> {
  try {
    const userProfile = await getProfileDetails(userId);
    if (!userProfile) {
      throw new InternalServerError(
        `User profile with ID ${userId} not found.`
      );
    }
    const userRepository = new UserDetailsRepository();
    const updatedUserProfile = await userRepository.updateUserProfile(
      userId,
      data
    );

    if (!updatedUserProfile) {
      return null;
    }

    return updatedUserProfile;
  } catch (error) {
    console.error(error);
    throw new Error(`Error updating user profile with ID ${userId}.`);
  }
}

export async function getProfileDetails(
  userId: number
): Promise<ProfileData | null> {
  try {
    const userRepository = new UserDetailsRepository();
    const getSelfUserProfile = await userRepository.getSelfUSerProfile(userId);

    if (!getSelfUserProfile) {
      return null;
    }

    return getSelfUserProfile;
  } catch (error) {
    console.error(error);
    throw new InternalServerError(
      `Error retrieving user profile with ID ${userId}.`
    );
  }
}

export async function deleteProfile(
  userId: string
): Promise<ProfileData | null> {
  try {
    const userRepository = new UserDetailsRepository();

    const deletedProfile = await userRepository.deleteUserProfile(userId);

    if (!deletedProfile) {
      return null;
    }
    return deletedProfile;
  } catch (error) {
    console.error(error);
    throw new InternalServerError(
      `Error deleting user profile with ID ${userId}.`
    );
  }
}
