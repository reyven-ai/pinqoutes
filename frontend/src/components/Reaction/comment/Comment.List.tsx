import {
  useCommentPinqoutes,
  useGetAllCommentsPerPinqoutes,
} from "@/hooks/useComment";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

interface CommentProps {
  pinId: string;
}

const CommentList: React.FC<CommentProps> = ({ pinId }) => {
  const { getAllComments, fetchAllCommentsPerPinqoutes } =
    useGetAllCommentsPerPinqoutes();

  useEffect(() => {
    fetchAllCommentsPerPinqoutes(pinId);
  }, [pinId, fetchAllCommentsPerPinqoutes]);

  if (!getAllComments || getAllComments.length === 0) {
    return (
      <div className="text-center">
        <h2 className="font-bold text-[23px]">No comments yet.</h2>
        <p className="text-[15px]">Start the conversation.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="absolute top-[87px]">
        {getAllComments.map((coms) => (
          <div key={coms.id} className="">
            <div className="flex flex-col mb-[2rem]">
              <div className="flex gap-[5px] px-4 items-center">
                <Link
                  className="text-[13px] text-[#000] font-semibold flex items-center gap-[5px]"
                  to={`/profile/${coms.user_id}`}
                >
                  <img
                    className="w-[35px] h-[35px] rounded-[50%]"
                    src={coms?.profile_picture_url}
                    alt=""
                  />
                  {coms.created_by}
                </Link>
                {coms.comment}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default CommentList;
