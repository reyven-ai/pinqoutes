import { logout } from "../components/services/auth.util";
import {
  ReportOutlined,
  SettingsOutlined,
  HelpOutline,
  SecurityOutlined,
  ExitToAppOutlined,
  HomeOutlined,
  SaveOutlined,
  CollectionsOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileData } from "@/types/user.types";
import { getSelfProfile } from "@/components/services/user.services";
import { useProfileAction } from "@/hooks/useProfileAction";
import DeleteProfile from "@/components/userProfile/CreateProfile";

const ProfileView: React.FC = () => {
  const { handleDeleteProfile } = useProfileAction();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await getSelfProfile();
        if (isMounted) {
          setUserProfile(response.data);
          console.log("User Profile Data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    logout();
    if (window.confirm("Log out of your account?")) {
      navigate("/login");
    }
  };
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-[full] mr-[auto] ml-[auto] mt-[1rem] mb-[1rem]pt-[2rem] justify-center gap-[1rem]">
      <div className="h-[auto] bg-white w-[260px] rounded-lg">
        <div className="text-center mt-[0.5rem] mb-[2rem]">
          <img
            className="w-[70px] h-[70px] object-cover rounded-[50%] mb-[0.4rem] border-2 border-white m-[auto]"
            src="https://scontent-hel3-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p74x74&_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=u5yxx_SBedYAX9Hl2AT&_nc_ht=scontent-hel3-1.xx&oh=00_AfCSqn2RmCb7PlerIJgFkMaPf8JmVrvQrQ3WS9Bx6-HtDg&oe=65A039B8"
          ></img>
          <h2 className="text-[22px]">{userProfile.userProfile.username}</h2>
          <p className="text-primaryTextColor">
            {userProfile.userProfile.description}
          </p>
          <span className="text-backgroundButtonColor font-semibold text-[14px]">
            3k followers
          </span>
        </div>
        <hr />
        <h2 className=" pl-[1rem] text-[17px] font-semibold mt-[0.5rem] mb-[0.8rem]">
          Collections
        </h2>
        <ul className="pl-[1rem]">
          <li className="mb-[1rem]">
            <CollectionsOutlined /> Created Pint
          </li>
          <li className="mb-[1rem]">
            <SaveOutlined /> Saved Pint
          </li>
        </ul>
        <hr />
        <h2 className=" pl-[1rem] text-[17px] font-semibold mt-[0.5rem] mb-[0.8rem]">
          General
        </h2>
        <ul className="pl-[1rem]">
          <li className="mb-[1rem]">
            <ReportOutlined /> Statements and report
          </li>
          <li className="mb-[1rem]">
            {" "}
            <SettingsOutlined /> Settings
          </li>
          <li className="mb-[1rem]">
            <HelpOutline /> Help
          </li>
          <li className="mb-[1rem]">
            {" "}
            <SecurityOutlined /> Privacy and Security
          </li>
          <li className="mb-[1rem]">
            <button onClick={handleLogout}>
              <ExitToAppOutlined /> Lagout
            </button>
          </li>
          <li className="mb-[1rem]">
            <button onClick={handleDeleteProfile}>
              <ExitToAppOutlined /> Delete
            </button>
          </li>
        </ul>
      </div>
      <div className="h-[550px] w-[45%] bg-white"></div>
      <div className="h-[100%] bg-white w-[260px] pl-[1rem]">
        <h2 className="text-[17px] font-semibold mt-[0.5rem] mb-[0.8rem]">
          Skills
        </h2>
        <button>Edit Profile</button>
        <DeleteProfile />
      </div>
    </div>
  );
};

export default ProfileView;
