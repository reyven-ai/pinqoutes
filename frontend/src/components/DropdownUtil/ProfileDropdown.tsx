import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/services/auth.util";
import { useGetProfileData } from "@/hooks/useProfileAction";
import {
  Settings,
  Help,
  ExitToAppTwoTone,
  Brightness2,
} from "@material-ui/icons";

function ProfileUtil() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userProfile } = useGetProfileData();
  const navigate = useNavigate();

  const dropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    const userConfirmed = window.confirm("Log out of your account?");
    if (userConfirmed) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="relative">
        <li onClick={dropdownOpen} className="cursor-pointer">
          <img
            className="w-[40px] h-[40px] rounded-[50%] ml-[0.3rem]"
            src="https://scontent-hel3-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=db1b99&_nc_ohc=CO5dz350V7MAX9kFeXv&_nc_ht=scontent-hel3-1.xx&oh=00_AfBMSaHIoB2c8ytJCJcebW_60u-ewU04TnejVhzFEX8xlA&oe=65AC1738"
            alt=""
          />
        </li>
        {isDropdownOpen && (
          <div className="absolute top-3 right-0 mt-8 bg-white border rounded shadow-md w-[350px] px-4 py-4">
            <ul>
              <li className="flex mb-[1.5rem] shadow-shadowTop rounded-lg">
                <Link
                  className="flex items-center gap-2 bg-white w-[322px] px-2 py-4 rounded-lg"
                  to="/profile"
                >
                  <img
                    className="w-[40px] h-[40px] rounded-[50%] ml-[0.3rem]"
                    src="https://scontent-hel3-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=db1b99&_nc_ohc=CO5dz350V7MAX9kFeXv&_nc_ht=scontent-hel3-1.xx&oh=00_AfBMSaHIoB2c8ytJCJcebW_60u-ewU04TnejVhzFEX8xlA&oe=65AC1738"
                    alt=""
                  />
                  <span className="font-semibold">{userProfile?.username}</span>
                </Link>
              </li>
              <li className="mb-[1rem] flex items-center gap-2">
                <Brightness2 /> Display and Accessibility
              </li>
              <li className="mb-[1rem] flex items-center gap-1">
                <Settings />
                Settings and Privacy
              </li>
              <li className="mb-[1rem] flex items-center gap-1">
                <Help /> Help and Support
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="mb-[1rem] flex items-center gap-2"
                >
                  <ExitToAppTwoTone />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUtil;
