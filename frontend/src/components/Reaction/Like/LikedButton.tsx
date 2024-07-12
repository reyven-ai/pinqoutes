import React, { useContext } from "react";
import heart from "../../../assets/heartWhite.svg";
import heartActive from "../../../assets/heartActive.svg";
import { getCurrentUserId } from "@/services/auth.util";
import { useLikePinqoutes } from "@/hooks/useLike";

interface LikeComponentProps {
  pinId: string;
}

const LikeButton: React.FC<LikeComponentProps> = ({ pinId }) => {
  const loggedInUserId = getCurrentUserId();
  const { liked, likePin, unlikePin, loading, error } = useLikePinqoutes(
    loggedInUserId,
    pinId
  );

  const handleLike = async () => {
    if (!loggedInUserId) {
      console.error("User is not logged in");
      return;
    }
    if (liked) {
      await unlikePin(); // Unsave if already saved
    } else {
      await likePin(); // Save if not already saved
    }
  };

  return (
    <>
      <button
        className="p-0 m-0"
        onClick={handleLike}
        disabled={loading || !loggedInUserId}
      >
        <img src={liked ? heartActive : heart} alt="Like Icon" />
      </button>
      {error && <p>{error}</p>}
    </>
  );
};

export default LikeButton;
