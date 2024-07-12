import { getAllPins } from "@/services/pin.services";
import { getSavedPinqoutes } from "@/services/save.services";
import {
  getSavedPins,
  getUserPins,
  removeUserPin,
  saveUserPin,
} from "@/services/users.services";
import { ListPinsData, SavedDetails } from "@/types/pin.types";
import { useEffect, useState } from "react";

export const useUsersPins = (userId: string) => {
  const [usersPins, setUsersPins] = useState<ListPinsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const usersPinsList = await getUserPins(userId);
          setUsersPins(usersPinsList);
        } else {
          console.log("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching user pins:", error);
      }
    };

    fetchData();

    return () => {};
  }, [userId]);

  return {
    usersPins: Array.isArray(usersPins) ? usersPins : [],
  };
};

export const useGetAllPins = () => {
  const [allPins, setAllPins] = useState<ListPinsData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersList = await getAllPins();
        setAllPins(allUsersList);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchData();
    return () => {};
  }, []);

  return {
    allPins: Array.isArray(allPins) ? allPins : [],
  };
};

export const AllPinReels = (
  pins: ListPinsData[] | null
): ListPinsData[] | null => {
  if (!pins) return null;

  const reelPins = pins.filter((pin) => pin.file_url === "video");

  return reelPins.length > 0 ? reelPins : null;
};

export const useSaveUserPin = () => {
  const savePin = async (userId: string, pinId: string) => {
    try {
      await saveUserPin(userId, pinId);
      console.log("Pin saved successfully");
    } catch (error) {
      console.error("Error saving pin:", error);
    }
  };

  return {
    savePin,
  };
};

export const useRemoveUserPin = () => {
  const removePin = async (userId: string, pinId: string) => {
    try {
      await removeUserPin(userId, pinId);
      console.log("Pin removed successfully");
    } catch (error) {
      console.error("Error removing pin:", error);
    }
  };

  return {
    removePin,
  };
};

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
