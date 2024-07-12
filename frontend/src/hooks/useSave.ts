import {
  getSavedPinqoutes,
  hasUserSavedPin,
  savePinqoutes,
  unsavePinqoutes,
} from "@/services/save.services";
import { SavedDetails } from "@/types/pin.types";
import { useCallback, useEffect, useState } from "react";

export const useSavePinqoutes = (userId: string | null, pinId: string) => {
  const [save, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchLikeData = async () => {
        try {
          setLoading(true);
          const userSaved = await hasUserSavedPin(userId, pinId);
          setSaved(userSaved);
        } catch (error) {
          console.error("Error fetching save data:", error);
          setError("Error fetching save data");
        } finally {
          setLoading(false);
        }
      };

      fetchLikeData();
    }
  }, [userId, pinId]);

  const savePin = async () => {
    if (!userId) {
      setError("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      await savePinqoutes(userId, pinId);
      setSaved(true);
      console.log("Pinqoutes saved successfully");
    } catch (error) {
      console.error("Error saving pinqoutes:", error);
      setError("Error saving pinqoutes");
    } finally {
      setLoading(false);
    }
  };

  const unsavePin = async () => {
    if (!userId) {
      setError("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      await unsavePinqoutes(userId, pinId);
      setSaved(false);
      console.log("Pinqoutes unsaved successfully");
    } catch (error) {
      console.error("Error unsaving pinqoutes:", error);
      setError("Error unsaving pinqoutes");
    } finally {
      setLoading(false);
    }
  };

  return {
    save,
    savePin,
    unsavePin,
    loading,
    error,
  };
};

export const useGetSavedPins = () => {
  const [savedPins, setSavedPins] = useState<SavedDetails[]>([]);

  const fetchSavedPins = useCallback(async (userId: string) => {
    try {
      const pins = await getSavedPinqoutes(userId);
      setSavedPins(pins);
      console.log("Pins fetched successfully");
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  }, []);

  return {
    savedPins,
    fetchSavedPins,
  };
};
