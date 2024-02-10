import { getAllPins } from "@/services/pin.services";
import {
  getAllUsers,
  getSavedPins,
  getUserPins,
  removeUserPin,
  saveUserPin,
} from "@/services/users.services";
import { ListPinsData, SavedDetails } from "@/types/pin.types";
import { ProfileApiData } from "@/types/profile.types";
import { useEffect, useState } from "react";

export const useUsersPins = (userId: string) => {
  const [usersPins, setUsersPins] = useState<ListPinsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = localStorage.getItem("user_id");
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

export const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState<ProfileApiData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersList = await getAllUsers();
        setAllUsers(allUsersList);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return {
    allUsers: Array.isArray(allUsers) ? allUsers : [],
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
  }, [allPins]);

  return {
    allPins: Array.isArray(allPins) ? allPins : [],
  };
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

export const useGetSavedPins = () => {
  const [savedPins, setSavedPins] = useState<SavedDetails | null>(null);

  const fetchSavedPins = async (userId: string) => {
    try {
      const pins = await getSavedPins(userId);
      setSavedPins(pins);
      console.log("Pins fetched successfully");
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  };

  return {
    savedPins: Array.isArray(savedPins) ? savedPins : [],
    fetchSavedPins,
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
