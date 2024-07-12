import { usePinDetails } from "@/hooks/usePinAction";
import { Link, useParams } from "react-router-dom";
import LikeButton from "../Reaction/Like/LikedButton";
import LikeCount from "../Reaction/Like/LikeCount";
import save from "../../assets/bookmarkWhite.svg";
import Comment from "../Reaction/comment/Comment";
import Send from "../Reaction/Send";
import PinProfile from "./Pin.Created";
import CommentCount from "../Reaction/comment/Comment.Count";
import FollowButton from "../Reaction/follow/Follow.Button";
import FollowCount from "../Reaction/follow/Follow.Count";

// interface LikeCountProps {
//   pinId: string;
// }

const PinDetails: React.FC = () => {
  const { id } = useParams();
  const { pinDetails, loading, error } = usePinDetails(id || "");

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">Error loading pin details</p>;
  }

  if (!pinDetails) {
    return <p className="text-center">Pin details not found</p>;
  }

  const renderFile = () => {
    const fileType = pinDetails.file_type;
    const fileUrl = pinDetails.file_url;

    if (fileType.startsWith("image")) {
      return (
        <img
          className="rounded-l-[25px] shadow-shadowTop object-cover"
          src={fileUrl}
          alt={`Pin by ${pinDetails.user_id}`}
        />
      );
    } else if (fileType.startsWith("video")) {
      return (
        <video
          loop
          controls
          className="rounded-l-[25px] shadow-shadowTop object-cover"
        >
          <source src={fileUrl} type="video/MP4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="w-[100%] mt-[5.8rem] ml-[7.5rem]">
      <div className="lg:w-[60%] m-[auto] justify-center">
        <div className="lg:flex lg:w-[100%] bg-white m-[auto] justify-center rounded-[25px] shadow-shadowTop">
          <div className="relative w-[100%] h-[auto]">
            {renderFile()}
            <div className="flex justify-between ">
              <div className="absolute bottom-2 left-1 px-2 py-0 rounded-[24px]">
                <ul className="flex items-center gap-[15px]">
                  <li className="flex flex gap-[4px] items-center">
                    <LikeButton pinId={pinDetails.id} />
                    <LikeCount pinId={pinDetails.id} />
                  </li>
                  <li className="flex flex items-center">
                    <Comment pinId={pinDetails.id} />
                    <CommentCount pinId={pinDetails.id} />
                  </li>
                  <li className="flex flex items-center">
                    <Send />
                  </li>
                </ul>
              </div>
              <div className="flex flex items-center absolute bottom-2 right-1 px-1 py-0 rounded-[24px] font-semibold">
                <img src={save} alt="save" />
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            <div className="flex justify-between items-center px-8 pt-6">
              <Link
                to={`/profile/${pinDetails.user_id}`}
                className="flex items-center gap-2 w-[322px] rounded-lg"
              >
                <img
                  className="w-[50px] h-[50px] rounded-[50%] ml-[0.3rem] object-cover"
                  src={pinDetails.profile_picture_url}
                  alt=""
                />
                <div>
                  <h2 className="w-[250px] font-semibold mb-[-5px]">
                    {pinDetails.created_by}
                  </h2>
                  <span className="flex items-center text-[15px] gap-[5px] font-semibold text-[#6D6D6D]">
                    <FollowCount followedId={pinDetails.user_id} />
                    followers
                  </span>
                </div>
              </Link>
              <div>
                <FollowButton followedId={pinDetails.user_id} />
              </div>
            </div>
            <div className="px-8 py-5">
              <h2 className="text-[26px] font-semibold leading-[2rem] my-[1.5rem]">
                {pinDetails.title}
              </h2>
              <p className="mb-[1.5rem]">{pinDetails.description}</p>
              {pinDetails.link && (
                <Link
                  className="underline text-[#6D6D6D]"
                  to={
                    pinDetails.link.startsWith("http")
                      ? pinDetails.link
                      : `http://${pinDetails.link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pinDetails.link}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center text-[18px] font-semibold mt-[3rem]">
          More Like This
        </h2>
        <PinProfile />
      </div>
    </div>
  );
};

export default PinDetails;
