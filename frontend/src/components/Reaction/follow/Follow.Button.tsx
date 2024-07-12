import React from "react";
import { getCurrentUserId } from "@/services/auth.util";
import { useFollowUsers } from "@/hooks/useFollow";

interface FollowProps {
  followedId: string;
}

const FollowButton: React.FC<FollowProps> = ({ followedId }) => {
  const loggedInUserId = getCurrentUserId();
  const { followed, followUsers, unfollowUsers, loading, error } =
    useFollowUsers(loggedInUserId, followedId);

  const handleFollow = async () => {
    if (!loggedInUserId) {
      console.error("User is not logged in");
      return;
    }
    if (followed) {
      await unfollowUsers();
    } else {
      await followUsers();
    }
  };

  return (
    <>
      <button
        className="px-4 py-3 bg-[#000] text-[#fff] rounded-[24px] font-semibold"
        onClick={handleFollow}
        disabled={loading || !loggedInUserId}
      >
        {followed ? "Followed" : "Follow"}
      </button>
      {error && <p>{error}</p>}
    </>
  );
};

export default FollowButton;
