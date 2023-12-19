import { UserDetailsRepository } from "./userProfile.repository";
import { NotFoundError } from "../errors/errors";
import { UserProfileData } from "./userProfile.types";

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

// export async function update(
//   user_id: number,
//   profileId: string,
//   data: UserProfileData
// ): Promise<UserProfileData | null> {
//   try {
//     const userProfile = await get(profileId);

//     if (!userProfile) {
//       throw new NotFoundError(`User profile with ID ${profileId} not found.`);
//     }

//     if (user_id !== userProfile.user_id) {
//       throw new NotAuthError(
//         "Unauthorized: You can only update your own profile."
//       );
//     }

//     const userRepository = new UserDetailsRepository();
//     const updatedUserProfile = await userRepository.updateUserProfile(
//       profileId,
//       data
//     );

//     if (!updatedUserProfile) {
//       return null;
//     }

//     return updatedUserProfile;
//   } catch (error) {
//     console.error(error);
//     throw new Error(`Error updating user profile with ID ${profileId}.`);
//   }
// }

// export async function get(profileId: string): Promise<UserProfileData | null> {
//   try {
//     const userRepository = new UserDetailsRepository();
//     const userProfile = await userRepository.getUserProfileById(profileId);

//     if (!userProfile) {
//       return null;
//     }

//     return userProfile;
//   } catch (error) {
//     console.error(error);
//     throw new NotFoundError(
//       `Error retrieving user profile with ID ${profileId}.`
//     );
//   }
// }

// export async function remove(
//   user_id: number,
//   profileId: string
// ): Promise<UserProfileData | null> {
//   try {
//     const userProfile = await get(profileId);

//     console.log(">>>>> User Profile:", userProfile);

//     console.log(">>>>> User ID:", user_id);

//     if (!userProfile) {
//       throw new NotFoundError(`User profile with ID ${profileId} not found.`);
//     }

//     if (user_id !== userProfile.user_id) {
//       throw new NotAuthError(
//         "Unauthorized: You can only delete your own profile."
//       );
//     }

//     const userRepository = new UserDetailsRepository();
//     const deletedUserProfile = await userRepository.deleteUserProfile(
//       profileId
//     );

//     if (!deletedUserProfile) {
//       return null;
//     }

//     return deletedUserProfile;
//   } catch (error) {
//     console.error(error);
//     throw new Error(`Error deleting user with ID ${profileId}.`);
//   }
// }
