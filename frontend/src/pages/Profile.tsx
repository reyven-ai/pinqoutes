import { useState } from "react";
import { useGetProfileData } from "@/hooks/useProfileAction";
import UpdateProfileForm from "@/components/Profile/Profile.Update";
import PinProfile from "@/components/pin/Pin.Created";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "@/services/auth.util";
import { useUsersPins } from "@/hooks/useUsersAction";

import posts from "../assets/posts.svg";
import saved from "../assets/bookmark.svg";
import heart from "../assets/heart.svg";
import share from "../assets/send.svg";
import SaveList from "@/components/Reaction/Save/SaveList";
import LikedList from "@/components/Reaction/Like/LikeList";
import FollowButton from "@/components/Reaction/follow/Follow.Button";
import FollowCount from "@/components/Reaction/follow/Follow.Count";
import FollowingCount from "@/components/Reaction/follow/Following.Count";

const Profile = () => {
  const { userId } = useParams();
  const { userProfile } = useGetProfileData(Number(userId));
  const [activeTab, setActiveTab] = useState("posts");
  const loggedInUserId = getCurrentUserId();
  const { usersPins } = useUsersPins(userId || "");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className=" w-[full] ml-[16.5rem] mb-[1rem] justify-center gap-[1rem] mt-[5.8rem]">
      <div className="h-[150px] w-[70%] m-[auto]">
        <div className="h-[200px] bg-[#e4e6eb] rounded-[8px]"></div>
        <div className="flex justify-between items-start">
          <div className=" mt-[-2.5rem] mb-[2rem] relative flex items-center">
            <img
              className="w-[140px] h-[140px] z-10 object-cover rounded-[50%] border-2 border-white ml-[2rem]"
              src={
                userProfile?.profile_picture_url
                  ? userProfile.profile_picture_url
                  : "https://s.pinimg.com/images/user/default_140.png"
              }
              alt="Profile Picture"
            />

            <div className="flex justify-between gap-2 ml-2 mt-3">
              <div>
                <h2 className="text-[22px] mb-[-3px]">
                  {userProfile?.username}
                </h2>
                <p className="mb-[-2px]">{userProfile?.description}</p>
                <p className="text-[14px] font-semibold text-[#6D6D6D]">
                  {userProfile?.country_of_residence}
                </p>
              </div>
              {userId === loggedInUserId && <UpdateProfileForm />}
            </div>
          </div>
          {userId !== loggedInUserId && (
            <div className="m-[0.7rem]">
              <FollowButton followedId={userId} />
            </div>
          )}
        </div>
      </div>
      <div className="w-[83%] mx-[auto] mt-[11%]">
        <div className="flex items-center justify-center gap-[35px] mb-[2rem]">
          <p className="flex gap-[5px] items-center">
            <span className="text-[16px] font-semibold">
              {usersPins.length}
            </span>
            posts
          </p>
          <p className="flex gap-[5px] items-center">
            <span className="text-[16px] font-semibold">
              <FollowCount followedId={userId} />
            </span>
            followers
          </p>
          <p className="flex gap-[5px] items-center">
            <span className="text-[16px] font-semibold">
              <FollowingCount followerId={userId} />
            </span>
            following
          </p>
        </div>
        <hr className="h-[2px]" />
        <ul className="flex gap-[50px] mt-4 justify-center">
          <li
            className={`font-medium text-[13px] flex text-[#6D6D6D] items-center gap-[4px] text-[rgb(109 109 109] cursor-pointer ${
              activeTab === "posts" ? "text-[#000]" : ""
            }`}
            onClick={() => handleTabChange("posts")}
          >
            <img src={posts} alt="" />
            POSTS
          </li>
          <li
            className={`font-medium text-[#6D6D6D] flex items-center gap-[4px] text-[13px] font cursor-pointer ${
              activeTab === "saved" ? "font-semibold text-[#000]" : ""
            }`}
            onClick={() => handleTabChange("saved")}
          >
            <img src={saved} alt="" />
            SAVED
          </li>
          <li
            className={`font-medium text-[#6D6D6D] flex items-center gap-[4px] text-[13px] cursor-pointer ${
              activeTab === "shared" ? "text-[#000]" : ""
            }`}
            onClick={() => handleTabChange("shared")}
          >
            <img className="w-[22px] h-[22px]" src={share} alt="" />
            SHARED
          </li>
          <li
            className={`font-medium text-[#6D6D6D] flex items-center gap-[4px] text-[13px] cursor-pointer ${
              activeTab === "liked" ? "text-[#000]" : ""
            }`}
            onClick={() => handleTabChange("liked")}
          >
            <img className="w-[22px] h-[22px]" src={heart} alt="" />
            LIKED
          </li>
        </ul>
        {activeTab === "posts" && <PinProfile />}
        {activeTab === "saved" && <SaveList />}
        {activeTab === "shared" && <SaveList />}
        {activeTab === "liked" && <LikedList />}
      </div>
    </div>
  );
};

export default Profile;
