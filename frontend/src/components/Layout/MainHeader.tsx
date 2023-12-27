import { NavLink, useLocation } from "react-router-dom";
import Message from "../../assets/messenger.png";
import SearchBar from "../Searchbar/SearchBar";
import ProfileUtil from "../DropdownUtil/ProfileDropdown";
import Home from "../../assets/home.png";
import Youtube from "../../assets/youtube.png";
import People from "../../assets/people.png";
import Notification from "../../assets/notification.png";
import fillPeople from "../../assets/fillPeople.png";
import fillHome from "../../assets/fillHome.png";
import fillYoutube from "../../assets/fillYoutube.png";
import fillNotification from "../../assets/fillNotification.png";
import MenuDropdown from "../DropdownUtil/MenuDropdown";
import { checkAuthLoader } from "@/services/auth.util";

function MainHeader() {
  const location = useLocation();
  const isAuthenticated = checkAuthLoader();

  if (!isAuthenticated) {
    return null;
  }

  const navLinks = [
    { path: "/", image: Home, activeImage: fillHome },
    { path: "/watch", image: Youtube, activeImage: fillYoutube },
    { path: "/friend", image: People, activeImage: fillPeople },
    {
      path: "/notifications",
      image: Notification,
      activeImage: fillNotification,
    },
  ];

  return (
    <>
      <header className="flex bg-white justify-between items-center px-[0.5%] py-[0.3rem] shadow-md">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] mr-1 font-semibold text-blacks">
            <NavLink to="/">
              p
              <span className="text-[#3D91FD] font-normal text-[22px]">
                Tech
              </span>
            </NavLink>
          </h1>
          <SearchBar />
        </div>
        <div>
          <ul className="flex items-center font-normal ml-[-2rem]">
            {navLinks.map(({ path, image, activeImage }, index) => (
              <li key={index} className="w-[150px]">
                <NavLink to={path}>
                  <img
                    className="w-[27px] h-[27px]"
                    src={location.pathname === path ? activeImage : image}
                    alt=""
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex gap-1 items-center font-normal">
            <li>
              <MenuDropdown />
            </li>
            <li>
              <img
                className="w-[52px] h-[52px] rounded-[50%]"
                src={Message}
                alt=""
              />
            </li>
            <li>
              <ProfileUtil />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
export default MainHeader;
