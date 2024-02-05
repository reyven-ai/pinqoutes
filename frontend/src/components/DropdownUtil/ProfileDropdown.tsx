import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/services/auth.util";
import { Settings, Help, ExitToApp, Brightness2 } from "@material-ui/icons";
import DropDownModal from "../Modal/DropDownModal";

interface OtherComponentProps {
  username: string;
  userId: number;
}

const ProfileUtil: React.FC<OtherComponentProps> = ({ username, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // if (!userProfile) {
  //   return <div>Profile not found</div>;
  // }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <button onClick={openModal} className="cursor-pointer">
          <img
            className="w-[40px] h-[40px] rounded-[50%] ml-[0.3rem]"
            src="https://s.pinimg.com/images/user/default_140.png"
            alt=""
          />
        </button>
        {isModalOpen && (
          <DropDownModal onClose={closeModal}>
            <div className="absolute top-6 right-0 mt-8 bg-white border rounded shadow-md w-[350px] px-4 py-4">
              <ul>
                <li className="flex mb-[1.5rem] shadow-shadowTop rounded-lg">
                  <Link
                    className="flex items-center gap-2 bg-white w-[322px] px-2 py-4 rounded-lg"
                    to={`/profile/${userId}`}
                  >
                    <img
                      className="w-[40px] h-[40px] rounded-[50%] ml-[0.3rem]"
                      src="https://s.pinimg.com/images/user/default_140.png"
                      alt=""
                    />
                    <div>
                      <h2 className="font-semibold mb-[-5px]">{username}</h2>
                      <span className="text-[13px] font-semibold text-[#6D6D6D]">
                        3k followers
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="mb-[1rem] flex items-center gap-2.5">
                  <span className="bg-[#e4e6eb] rounded-[50%]">
                    <Brightness2 className="rotate-180 mx-1.5 my-1.5" />
                  </span>
                  Display and Accessibility
                </li>
                <li className="mb-[1rem] flex items-center gap-2.5">
                  <span className="bg-[#e4e6eb] rounded-[50%]">
                    <Settings className="mx-1.5 my-1.5" />
                  </span>
                  Settings and Privacy
                </li>
                <li className="mb-[1rem] flex items-center gap-2.5">
                  <span className="bg-[#e4e6eb] rounded-[50%]">
                    <Help className="mx-1.5 my-1.5" />
                  </span>
                  Help and Support
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="mb-[1rem] flex items-center gap-1"
                  >
                    <ExitToApp />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </DropDownModal>
        )}
      </div>
    </div>
  );
};

export default ProfileUtil;
