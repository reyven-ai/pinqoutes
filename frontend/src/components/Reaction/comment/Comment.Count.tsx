import { useCommentPinqoutes } from "@/hooks/useComment";
import { useLikePinqoutes } from "@/hooks/useLike";
import { getCurrentUserId } from "@/services/auth.util";
import React from "react";

interface LikeCountProps {
  pinId: string;
}

const CommentCount: React.FC<LikeCountProps> = ({ pinId }) => {
  const loggedInUserId = getCurrentUserId();
  const { commentCount, loading, error } = useCommentPinqoutes(
    loggedInUserId,
    pinId
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="">
      <p className="text-[#fff] text-[12px] font-semibold">
        {commentCount === 0 ? "" : commentCount}
      </p>
    </div>
  );
};

export default CommentCount;
