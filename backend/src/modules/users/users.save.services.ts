import { PinData } from "../pin/pin.types";
import { UserSavePinRepository } from "./users.save.repository";
import { SavedData } from "./users.save.types";

export async function savePin(data: SavedData): Promise<SavedData | null> {
  try {
    const pinRepository = new UserSavePinRepository();
    const savedPin = await pinRepository.saveUserPin(
      data.userId,
      data.pinId,
      data.title,
      data.description,
      data.image_url,
      data.created_at,
      data.created_by
    );

    if (!savedPin) {
      return null;
    }

    return savedPin;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving pin.");
  }
}

export async function removePin(userId: string, pinId: string): Promise<void> {
  try {
    const pinRepository = new UserSavePinRepository();
    await pinRepository.removeUserPin(userId, pinId);
  } catch (error) {
    console.error(error);
    throw new Error("Error removing pin.");
  }
}

export async function getSavedPins(userId: string): Promise<PinData[]> {
  try {
    const pinRepository = new UserSavePinRepository();
    const savedPins = await pinRepository.getSavedPins(userId);
    return savedPins;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching saved pins.");
  }
}
