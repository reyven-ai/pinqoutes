import { useFollowingUsers } from "@/hooks/useFollow";
import { getCurrentUserId } from "@/services/auth.util";
import React from "react";

interface FollowingCountProps {
  followerId: string;
}

const FollowingCount: React.FC<FollowingCountProps> = ({ followerId }) => {
  const loggedInUserId = getCurrentUserId();
  const { followingCount, loading, error } = useFollowingUsers(
    loggedInUserId,
    followerId
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <p className="text-[16px] font-semibold">
        {followingCount === 0 ? 0 : followingCount}
      </p>
    </>
  );
};

export default FollowingCount;
