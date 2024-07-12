import { useState, useEffect, useCallback } from "react";
import socketService from "@/services/socket.services";
import {
  followOtherUsers,
  getFollowersCountForUser,
  getFollowingCountForUser,
  hasUserFollowingOther,
  unfollowOtherUsers,
} from "@/services/follow.services";

export const useFollowUsers = (userId: string | null, followedId: string) => {
  const [followCount, setFollowCount] = useState<number | null>(null);
  const [followed, setFollowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        setLoading(true);
        const countFollowers = await getFollowersCountForUser(followedId);
        setFollowCount(countFollowers);
        if (userId) {
          const userFollowing = await hasUserFollowingOther(userId, followedId);
          setFollowed(userFollowing);
        }
      } catch (error) {
        console.error("Error fetching follow data:", error);
        setError("Error fetching follow data");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowData();

    socketService.connect();
    socketService.on("follow", (data) => {
      if (data.followedId === followedId) {
        setFollowCount((prevCount) => (prevCount !== null ? prevCount + 1 : 1));
      }
    });
    socketService.on("unfollow", (data) => {
      if (data.followedId === followedId) {
        setFollowCount((prevCount) => (prevCount !== null ? prevCount - 1 : 0));
      }
    });

    return () => {
      socketService.off("follow");
      socketService.off("unfollow");
      socketService.disconnect();
    };
  }, [userId, followedId]);

  const followUsers = async () => {
    if (!userId) {
      setError("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      await followOtherUsers(userId, followedId);
      setFollowCount((prevCount) => (prevCount !== null ? prevCount + 1 : 1));
      setFollowed(true);
      socketService.emit("follow", { userId, followedId });
    } catch (error) {
      console.error("Error following user:", error);
      setError("Error following user");
    } finally {
      setLoading(false);
    }
  };

  const unfollowUsers = async () => {
    if (!userId) {
      setError("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      await unfollowOtherUsers(userId, followedId);
      setFollowCount((prevCount) => (prevCount !== null ? prevCount - 1 : 0));
      setFollowed(false);
      socketService.emit("unfollow", { userId, followedId });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      setError("Error unfollowing user");
    } finally {
      setLoading(false);
    }
  };

  return {
    followCount,
    followed,
    followUsers,
    unfollowUsers,
    loading,
    error,
  };
};

export const useFollowingUsers = (
  userId: string | null,
  followerId: string
) => {
  const [followingCount, setFollowingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        setLoading(true);
        const countFollowing = await getFollowingCountForUser(followerId);
        setFollowingCount(countFollowing);
        // setLoading(true);
        // const countFollowing = await getFollowingCountForUser(followerId);
        // setFollowCount(countFollowing);
        // if (userId) {
        //   const userFollowing = await hasUserFollowingOther(userId, followedId);
        //   setFollowed(userFollowing);
        // }
      } catch (error) {
        console.error("Error fetching follow data:", error);
        setError("Error fetching follow data");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowData();

    socketService.connect();
    socketService.on("following", (data) => {
      if (data.followedId === followerId) {
        setFollowingCount((prevCount) =>
          prevCount !== null ? prevCount + 1 : 1
        );
      }
    });
    socketService.on("unfollow", (data) => {
      if (data.followedId === followerId) {
        setFollowingCount((prevCount) =>
          prevCount !== null ? prevCount - 1 : 0
        );
      }
    });

    return () => {
      socketService.off("follow");
      socketService.off("unfollow");
      socketService.disconnect();
    };
  }, [userId, followerId]);

  return {
    followingCount,
    loading,
    error,
  };
};
