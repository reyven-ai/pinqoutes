import { PinData } from "../pin/pin.types";
import { UserSaveRepository } from "./save.respository";
import { SavedPinqoutesData, SavePinqoutes } from "./save.types";

export async function savePin(
  data: SavePinqoutes
): Promise<SavedPinqoutesData | null> {
  try {
    const pinqoutesRepository = new UserSaveRepository();
    const pinqoutesExists = await pinqoutesRepository.checkPinqoutesExists(
      data.pinId
    );
    if (!pinqoutesExists) {
      throw new Error("Pinqoutes does not exist");
    }

    const savedPinqoutes = await pinqoutesRepository.createSave(
      data.userId,
      data.pinId,
      data.created_at
    );

    if (!savedPinqoutes) {
      return null;
    }

    return savedPinqoutes;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving pinqoutes.");
  }
}

export async function removePin(userId: string, pinId: string): Promise<void> {
  try {
    const pinqoutesRepository = new UserSaveRepository();
    await pinqoutesRepository.removeSave(userId, pinId);
  } catch (error) {
    console.error(error);
    throw new Error("Error removing pinqoutes.");
  }
}

export async function getSavedPinqoutes(userId: string): Promise<PinData[]> {
  try {
    const pinRepository = new UserSaveRepository();
    const savedPinqoutes = await pinRepository.getSave(userId);
    return savedPinqoutes;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching saved pinqoutes.");
  }
}

export async function hasUserSavedPinqoutes(
  userId: string,
  pinId: string
): Promise<boolean> {
  try {
    const saveRepository = new UserSaveRepository();
    const hasSaved = await saveRepository.hasUserSavedPin(userId, pinId);
    return hasSaved;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking if user saved pinqoutes.");
  }
}
