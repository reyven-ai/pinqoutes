import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Pin } from "@/types/pin.types";
import LikeCount from "../Reaction/Like/LikeCount";
import LikeButton from "../Reaction/Like/LikedButton";
import Comment from "../Reaction/comment/Comment";
import Send from "../Reaction/Send";
import CommentCount from "../Reaction/comment/Comment.Count";
import SaveButton from "../Reaction/Save/SaveButton";

const Column: React.FC<{ pins: Array<Pin> }> = ({ pins }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const renderFile = (pin: Pin) => {
    const fileType = pin.file_type;
    const fileUrl = pin.file_url;

    if (fileType.startsWith("image")) {
      return (
        <img
          className="rounded-[4px] w-full h-auto relative hover:opacity-60 transition-opacity"
          src={fileUrl}
          alt={pin.title}
          loading="lazy"
        />
      );
    } else if (fileType.startsWith("video")) {
      return (
        <video
          loop
          className="rounded-[4px] w-full h-auto relative hover:opacity-60 transition-opacity"
          // controls
        >
          <source src={pin.file_url} type="video/MP4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null; // Handle other file types as needed
    }
  };

  return (
    <div className="column flex-1 p-2">
      {pins.length > 0 ? (
        pins.map((pin) => (
          <div key={pin.id} className="relative group mb-4">
            <Link to={`/pins/${pin.id}`}>{renderFile(pin)}</Link>
            <div className="absolute top-0 left-0 flex items-end py-3 px-3">
              <div className="flex justify-between mt-1 items-center">
                <Link
                  className="text-[13px] text-[#fff] flex items-center gap-[5px]"
                  to={`/profile/${pin.user_id}`}
                >
                  <img
                    className="w-[35px] h-[35px] rounded-[50%]"
                    src={pin?.profile_picture_url}
                    alt=""
                  />
                  {pin.created_by}
                </Link>
              </div>
            </div>
            <div className="flex items-center absolute w-full bottom-0 justify-between py-3 px-1">
              <div className="flex items-center gap-[10px] px-1 gap-2">
                <div className="text-[15px] gap-[3px] flex items-center text-gray-500">
                  <LikeButton pinId={pin.id} />
                  <LikeCount pinId={pin.id} />
                </div>
                <div className="text-[15px] flex items-center text-gray-500">
                  <Comment pinId={pin.id} />
                  <CommentCount pinId={pin.id} />
                </div>
                <div className="text-[15px] flex items-center text-gray-500">
                  <Send />
                </div>
                {/* </div> */}
              </div>
              <SaveButton pinId={pin.id} />
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <Skeleton count={5} height={80} />
        </div>
      )}
    </div>
  );
};

export default Column;
