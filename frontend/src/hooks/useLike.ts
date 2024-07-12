import { useState, useEffect, useCallback } from "react";
import {
  likePinqoutes,
  getLikeCountForPin,
  hasUserLikedPin,
  unlikePinqoutes,
  getLikedPinqoutes,
} from "@/services/like.services";
import socketService from "@/services/socket.services";
import { LikedDetails } from "@/types/like.types";

export const useLikePinqoutes = (userId: string | null, pinId: string) => {
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        setLoading(true);
        const count = await getLikeCountForPin(pinId);
        setLikeCount(count);
        if (userId) {
          const userLiked = await hasUserLikedPin(userId, pinId);
          setLiked(userLiked);
        }
      } catch (error) {
        console.error("Error fetching like data:", error);
        setError("Error fetching like data");
      } finally {
        setLoading(false);
      }
    };

    fetchLikeData();

    socketService.connect();
    socketService.on("like", (data) => {
      if (data.pinId === pinId) {
        setLikeCount((prevCount) => (prevCount !== null ? prevCount + 1 : 1));
      }
    });
    socketService.on("unlike", (data) => {
      if (data.pinId === pinId) {
        setLikeCount((prevCount) => (prevCount !== null ? prevCount - 1 : 0));
      }
    });

    return () => {
      socketService.off("like");
      socketService.off("unlike");
      socketService.disconnect();
    };
  }, [userId, pinId]);

  const likePin = async () => {
    if (!userId) {
      setError("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      await likePinqoutes(userId, pinId);
      setLikeCount((prevCount) => (prevCount !== null ? prevCount + 1 : 1));
      setLiked(true);
      console.log("Pinqoutes liked successfully");
      socketService.emit("like", { userId, pinId }); // Emit like event
    } catch (error) {
      console.error("Error liking pin:", error);
      setError("Error liking pin");
    } finally {
      setLoading(false);
    }
  };

  const unlikePin = async () => {
    if (!userId) {
      setError("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      await unlikePinqoutes(userId, pinId);
      setLikeCount((prevCount) => (prevCount !== null ? prevCount - 1 : 0));
      setLiked(false);
      console.log("Pinqoutes unliked successfully");
      socketService.emit("unlike", { userId, pinId }); // Emit unlike event
    } catch (error) {
      console.error("Error unliking pin:", error);
      setError("Error unliking pin");
    } finally {
      setLoading(false);
    }
  };

  return {
    likeCount,
    liked,
    likePin,
    unlikePin,
    loading,
    error,
  };
};

export const useGetLikedPinqoutes = () => {
  const [likedPinqoutes, setLikedPinqoutes] = useState<LikedDetails[]>([]);

  const fetchSavedPins = useCallback(async (userId: string) => {
    try {
      const pinqoutes = await getLikedPinqoutes(userId);
      setLikedPinqoutes(pinqoutes);
      console.log("Pinqoutes fetched successfully");
    } catch (error) {
      console.error("Error fetching pinqoutes:", error);
    }
  }, []);

  return {
    likedPinqoutes,
    fetchSavedPins,
  };
};
