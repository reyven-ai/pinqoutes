import { InternalServerError } from "../../errors/errors";
import { ProfileRepository } from "./profile.repository";

import {
  CreateProfileInput,
  ProfileData,
  UpdateProfileInput,
} from "./profile.types";

export async function createProfile(
  data: CreateProfileInput
): Promise<CreateProfileInput> {
  try {
    const userRepository = new ProfileRepository();
    const createdUserProfile: CreateProfileInput =
      await userRepository.createUserProfile(
        data.user_id,
        data.profile_picture_url,
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
    const userRepository = new ProfileRepository();
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
    const userRepository = new ProfileRepository();
    const userProfile = await userRepository.getSelfUserProfile(userId);

    if (!userProfile) {
      return null;
    }

    return userProfile;
  } catch (error) {
    console.error(error);
    throw new InternalServerError(
      `Error retrieving user profile with ID ${userId}.`
    );
  }
}

export async function getAllUserProfiles(): Promise<ProfileData[]> {
  try {
    const userRepository = new ProfileRepository();
    const allProfiles = await userRepository.getAllUserProfiles();
    return allProfiles;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Error retrieving all user profiles.");
  }
}

export async function deleteProfile(
  userId: string
): Promise<ProfileData | null> {
  try {
    const userRepository = new ProfileRepository();

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
