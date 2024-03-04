import { PinData } from "../pin/pin.types";
import { UserSavePinRepository } from "./users.save.repository";
import { SavePinInput, SavedPinData } from "./users.save.types";

export async function savePin(
  data: SavePinInput
): Promise<SavedPinData | null> {
  try {
    const pinRepository = new UserSavePinRepository();
    const pinExists = await pinRepository.checkPinExists(data.pinId);
    if (!pinExists) {
      throw new Error("Pin does not exist");
    }

    const savedPin = await pinRepository.saveUserPin(
      data.userId,
      data.pinId,
      data.created_at
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
