import { useLikePinqoutes } from "@/hooks/useLike";
import { getCurrentUserId } from "@/services/auth.util";
import React from "react";

interface LikeCountProps {
  pinId: string;
}

const LikeCount: React.FC<LikeCountProps> = ({ pinId }) => {
  const loggedInUserId = getCurrentUserId();
  const { likeCount, loading, error } = useLikePinqoutes(loggedInUserId, pinId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <p className="text-[#fff] text-[12px] font-semibold">
        {likeCount === 0 ? "" : likeCount}
      </p>
    </>
  );
};

export default LikeCount;
