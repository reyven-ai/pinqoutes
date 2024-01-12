import { InternalServerError } from "../../errors/errors";
import { UserPinRepository } from "./pin.repository";
import { UserPinData } from "./pin.types";

export async function add(data: UserPinData): Promise<UserPinData> {
  try {
    const pinRepository = new UserPinRepository();
    const createdUserPin: UserPinData = await pinRepository.createUserPin(
      data.user_id,
      data.description,
      data.image_url,
      data.created_at
    );

    return createdUserPin;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading user pin.");
  }
}

export async function getUserPins(userId: string): Promise<UserPinData[]> {
  try {
    const pinRepository = new UserPinRepository();
    const userPins = await pinRepository.getUserPins(userId);

    return userPins || [];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user pins.");
  }
}

export async function getPinDetails(id: string): Promise<UserPinData | null> {
  try {
    const pinRepository = new UserPinRepository();
    const pinDetails = await pinRepository.getPinDetails(id);

    if (!pinDetails) {
      return null;
    }

    return pinDetails;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching pin details.");
  }
}

export async function updatePin(
  id: string,
  data: UserPinData
): Promise<UserPinData | null> {
  try {
    const userPinDetails = await getPinDetails(id);
    if (!userPinDetails) {
      throw new InternalServerError(`User profile with ID ${id} not found.`);
    }
    const pinRepository = new UserPinRepository();
    const updateUserPinDetails = await pinRepository.updatePinDetails(id, data);

    if (!updateUserPinDetails) {
      return null;
    }

    return updateUserPinDetails;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user pin.");
  }
}

export async function deletePin(id: string): Promise<UserPinData | null> {
  try {
    const pinRepository = new UserPinRepository();
    const deleteUserPin = await pinRepository.deleteUserPin(id);

    if (!deleteUserPin) {
      return null;
    }
    return deleteUserPin;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting user pin.");
  }
}
