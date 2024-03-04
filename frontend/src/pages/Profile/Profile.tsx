import { useState } from "react";
import { useGetProfileData } from "@/hooks/useProfileAction";
import UpdateProfileForm from "@/components/Profile/Profile.Update";
import PinProfile from "@/components/Pin/Pin.Created";
import SaveList from "@/components/Pin/Pin.SaveList";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "@/services/auth.util";

const Profile = () => {
  const { userId } = useParams();
  const { userProfile } = useGetProfileData(Number(userId));
  const [activeTab, setActiveTab] = useState("created");
  const loggedInUserId = getCurrentUserId();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className=" w-[full] ml-[auto] mb-[1rem] justify-center gap-[1rem] mt-[5.8rem]">
      <div className="h-[150px] w-[60%] m-[auto]">
        <div className="h-[200px] bg-[#e4e6eb] rounded-[8px]"></div>
        <div className="flex justify-between items-start">
          <div className=" mt-[-2.5rem] mb-[2rem] relative flex items-center">
            <img
              className="w-[140px] h-[140px] object-cover rounded-[50%] border-2 border-whit ml-[2rem]"
              src="https://s.pinimg.com/images/user/default_140.png"
            ></img>
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
            <button className="bg-backgroundButtonColor text-white px-7 py-2 rounded-[20px] mr-[2rem] mt-[0.7rem]">
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="w-[83%] mx-[auto] mt-[11%]">
        <div className="flex items-center justify-center gap-[35px] mb-[2rem]">
          <span className="text-[18px]">0 posts</span>
          <span className="text-[18px]">0 followers</span>
          <span className="text-[18px]">0 following</span>
        </div>
        <hr className="h-[2px]" />
        <ul className="flex gap-[30px] mt-1 justify-center">
          <li
            className={`font-semibold cursor-pointer ${
              activeTab === "created" ? "text-[#3D91FD]" : ""
            }`}
            onClick={() => handleTabChange("created")}
          >
            Created
          </li>
          <li
            className={`font-semibold cursor-pointer ${
              activeTab === "saved" ? "text-[#3D91FD]" : ""
            }`}
            onClick={() => handleTabChange("saved")}
          >
            Saved
          </li>
        </ul>
        {activeTab === "created" && <PinProfile />}
        {activeTab === "saved" && <SaveList />}
      </div>
    </div>
  );
};

export default Profile;
