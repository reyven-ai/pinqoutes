import { NavLink, useParams } from "react-router-dom";
import {
  useGetProfileData,
  useGetProfileProps,
} from "@/hooks/useProfileAction";
import { checkAuthLoader } from "@/services/auth.util";
import logos from "../../assets/Logos.png";
import home from "../../assets/home.svg";
import activeHome from "../../assets/activeHome.svg";
import reels from "../../assets/reels.svg";
import activeReels from "../../assets/activeReels.svg";
import people from "../../assets/people.svg";
import activePeople from "../../assets/activePeople.svg";
import heart from "../../assets/heart.svg";
import activeHeart from "../../assets/activeHeart.svg";
import create from "../../assets/create.svg";
import activeCreate from "../../assets/activeCreate.svg";
import profile from "../../assets/profile.svg";
import Logout from "../DropdownUtil/Logout";
import search from "../../assets/search.svg";
import activeSearch from "../../assets/activeSearch.svg";

const MainHeader = () => {
  const { userProfileProps } = useGetProfileProps();
  const isAuthenticated = checkAuthLoader();

  if (!isAuthenticated) {
    return null;
  }

  const navLinks = [
    {
      path: "/",
      name: "Home",
      img: home,
      activeLink: activeHome,
    },
    {
      path: "/search",
      name: "Search",
      img: search,
      activeLink: activeSearch,
    },
    {
      path: "/reels",
      name: "Reels",
      img: reels,
      activeLink: activeReels,
    },
    {
      path: "/people",
      name: "People",
      img: people,
      activeLink: activePeople,
    },
    {
      path: "/notifications",
      name: "Notifications",
      img: heart,
      activeLink: activeHeart,
    },
    {
      path: "/pin/create",
      name: "Create",
      img: create,
      activeLink: activeCreate,
    },
    {
      path: `/profile/${userProfileProps?.user_id}`,
      name: "Profile",
      img: [
        userProfileProps?.profile_picture_url
          ? userProfileProps?.profile_picture_url
          : profile,
      ],
    },
  ];

  return (
    <>
      <header className="flex flex-col h-[100vh] bg-[#fff] w-[250px] fixed justify-between px-[0.1rem] py-[1rem] top-0 z-10 ">
        <div>
          <div className="flex items-center justify-between gap-3 px-[1.7rem] mb-[3rem]">
            <h1 className="text-[22px] mr-3 mt-[1.8rem] font-semibold">
              <NavLink to="/" className="flex items-center gap-[10px]">
                {/* <img className="w-[30px] h-[auto]" src={logos}></img> */}
                Pinqoutes
              </NavLink>
            </h1>
          </div>
          <div>
            <ul className="flex flex-col gap-[1.7rem] font-normal w-[100%] px-[1.3rem]">
              {navLinks.map(({ path, img, name, activeLink }, index) => (
                <li key={index}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "font-bold" : undefined
                    }
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-[10px]">
                        <img
                          className={`${
                            index === 6
                              ? "w-[24px] h-[24px] rounded-[50%] ml-[3px] mr-[3px]"
                              : ""
                          }`}
                          src={isActive && activeLink ? activeLink : img}
                          alt={name}
                        />
                        {name}
                      </div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Logout />
          {/* <div className="flex gap-3 items-center font-normal">
            <SearchBar />
            <div>
              <ProfileUtil />
            </div>
          </div> */}
        </div>
      </header>
    </>
  );
};
export default MainHeader;
