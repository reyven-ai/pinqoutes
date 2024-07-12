import React from "react";
import { useGetAlUserProfiles } from "@/hooks/useProfileAction";
import { Link } from "react-router-dom";
import { UserProfileData } from "@/types/profile.types";

import arrowRight from "../assets/arrow-right.svg";
import arrowLeft from "../assets/previous.svg";

const People: React.FC = () => {
  const { allUserProfiles, loading, error } = useGetAlUserProfiles(); // Adjusted hook name to match our previous implementation

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!allUserProfiles) {
    return <div>No user profiles found.</div>;
  }

  const currentUserId = Number(localStorage.getItem("user_id"));
  const filteredUserProfiles = allUserProfiles.filter(
    (userProfile) => userProfile.user_id !== currentUserId
  );
  const sortedUserProfiles = filteredUserProfiles.sort(
    (a, b) => b.profile_id - a.profile_id
  );

  return (
    <div className="ml-[16.5rem] mt-[6rem] mb-[1rem]">
      <div className="flex items-center w-[90%] m-[auto] gap-[5rem]">
        <button className="border p-[0.5rem] rounded-[50%]">
          <img src={arrowLeft} alt="" />
        </button>
        <div className="grid grid-cols-auto-fit-minmax gap-[20px] h-[520px] overflow-scroll w-[100%] mx-[auto] pb-[50px] pt-[20px]">
          {sortedUserProfiles.map((user: UserProfileData) => (
            <Link to={`/profile/${user.user_id}`} key={user.profile_id}>
              <div className="w-full h-auto border border-[#e2e8f0] rounded-[4px] items-center p-[20px]">
                <div className="m-[auto] h-[190px] text-center flex-col items-center justify-center">
                  <img
                    className="w-[75px] h-[75px] object-cover m-[auto] rounded-[50%]"
                    src={
                      user.profile_picture_url ||
                      "https://s.pinimg.com/images/user/default_140.png"
                    }
                    alt={user.username}
                  />
                  <h2 className="font-semibold text-18px mt-[5px]">
                    {user.username}
                  </h2>
                  <p className="text-[14px] text-[#6D6D6D]">
                    {user.description}
                  </p>
                  <div className="mt-[0.5rem]">
                    {/* <span className="text-13px font-semibold text-[#6D6D6D]">
                    0 followers
                  </span> */}
                    <button className="text-[13px] font-semibold rounded-24px text-[#fff] bg-[#000] w-90%  py-[0.3rem] px-[1.5rem] rounded-[22px]">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button className="border p-[0.5rem] rounded-[50%]">
          <img src={arrowRight} alt="" />
        </button>
      </div>
    </div>
  );
};

export default People;
