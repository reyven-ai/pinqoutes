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

export async function getUserPins(userId: number): Promise<UserPinData[]> {
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
