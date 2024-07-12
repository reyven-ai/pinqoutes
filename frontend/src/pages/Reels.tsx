import { useGetAllPins } from "@/hooks/useUsersAction";
import { Pin } from "@/types/pin.types";
import React from "react";

import comment from "../assets/comment.svg";
import send from "../assets/sendWhite.svg";
import bookmark from "../assets/bookmarkWhite.svg";
import LikeButton from "@/components/Reaction/Like/LikedButton";
import LikeCount from "@/components/Reaction/Like/LikeCount";
import Comment from "@/components/Reaction/comment/Comment";
import CommentCount from "@/components/Reaction/comment/Comment.Count";

const Reels: React.FC = () => {
  const { allPins } = useGetAllPins();

  const reels = allPins.filter((pin: Pin) => pin.file_type === "video");

  const sortedReels = reels.sort(
    (a: Pin, b: Pin) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="mt-[2.2rem]">
      <div className="ml-[18.5rem] w-[80%]">
        <div className=" flex items-center border-b p-[1rem] m-[1rem] gap-[15px]">
          <p className="font-semibold text-[18px]">For you</p>
          <p className="font-semibold text-[18px] text-[#6D6D6D]">Following</p>
        </div>
        <div className="w-[40%] flex flex-col justify-center items-center m-auto gap-[20px]">
          {sortedReels.map((reel: Pin) => (
            <div key={reel.id} className="flex flex-col gap-[15px]">
              <div className="relative flex gap-[26px] items-center mt-[0.5rem] justify-center">
                <div className="absolute left-0 h-[80vh] w-[calc((100vw-750px)/2)] bg-[#000] opacity-10 filter blur-[30px]"></div>
                <div className="absolute right-0 h-[80vh] w-[calc((100vw-750px)/2)] bg-[#000] opacity-10 filter blur-[30px]"></div>
                <div className="relative z-10 rounded-[4px] h-[80vh] w-[450px]">
                  <video
                    src={reel.file_url}
                    controls
                    loop
                    className="h-full w-full object-fill rounded-[4px]"
                  />
                  <div className="absolute top-0 left-0 flex items-center gap-[12px] p-[10px] w-full">
                    <img
                      className="w-[35px] h-[35px] rounded-[50%]"
                      src={
                        reel.profile_picture_url ||
                        "https://s.pinimg.com/images/user/default_140.png"
                      }
                      alt=""
                    />
                    <p className="font-semibold text-white">
                      {reel.created_by}
                    </p>
                    <p>{reel.description}</p>
                    {/* <button className="text-[#fff] text-[14px]">
                      Follow
                    </button> */}
                  </div>
                  <div>
                    <ul className=" absolute right-3 top-[40%] flex flex-col items-center gap-[22px]">
                      <li className="flex flex-col items-center gap-0 m-0 p-0">
                        <LikeButton pinId={reel.id} />
                        <LikeCount pinId={reel.id} />
                      </li>
                      <li className="flex flex-col items-center">
                        <Comment pinId={reel.id} />
                        <CommentCount pinId={reel.id} />
                        {/* <span>0</span> */}
                      </li>
                      <li className="flex flex-col items-center">
                        <img src={send} alt="" />
                      </li>
                      <li className="flex flex-col items-center">
                        <img src={bookmark} alt="" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reels;
