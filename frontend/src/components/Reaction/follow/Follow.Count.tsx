import { useFollowUsers } from "@/hooks/useFollow";
import { getCurrentUserId } from "@/services/auth.util";
import React from "react";

interface FollowCountProps {
  followedId: string;
}

const FollowCount: React.FC<FollowCountProps> = ({ followedId }) => {
  const loggedInUserId = getCurrentUserId();
  const { followCount, loading, error } = useFollowUsers(
    loggedInUserId,
    followedId
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
        {followCount === 0 ? 0 : followCount}
      </p>
    </>
  );
};

export default FollowCount;
