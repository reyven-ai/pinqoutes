import { getAllPins } from "@/services/pin.services";
import { getAllUsers, getUserPins } from "@/services/users.services";
import { ListPinsData } from "@/types/pin.types";
import { ProfileApiData } from "@/types/profile.types";
import { useEffect, useState } from "react";

export const useUsersPins = () => {
  const [usersPins, setUsersPins] = useState<ListPinsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId) {
          const usersPinsList = await getUserPins();
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
  }, []);

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

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
