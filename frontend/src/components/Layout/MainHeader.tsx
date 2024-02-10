import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "../Searchbar/SearchBar";
import ProfileUtil from "../DropdownUtil/ProfileDropdown";

import { checkAuthLoader } from "@/services/auth.util";
import { Home, Notifications, People, YouTube } from "@material-ui/icons";

const MainHeader = () => {
  // const { userId } = useParams();

  const location = useLocation();
  const isAuthenticated = checkAuthLoader();

  if (!isAuthenticated) {
    return null;
  }

  const customColor = "rgb(61, 145, 253)";
  const notActiveColor = "rgba(0, 0, 0, 0.6)";
  const fontSize = "27px";

  const navLinks = [
    {
      path: "/",
      name: "Home",
      icon: <Home style={{ color: notActiveColor, fontSize: fontSize }} />,
      activeIcon: <Home style={{ color: customColor, fontSize: fontSize }} />,
    },
    {
      path: "/watch",
      name: "Watch",
      icon: <YouTube style={{ color: notActiveColor, fontSize: fontSize }} />,
      activeIcon: (
        <YouTube style={{ color: customColor, fontSize: fontSize }} />
      ),
    },
    {
      path: "/people",
      name: "People",
      icon: <People style={{ color: notActiveColor, fontSize: fontSize }} />,
      activeIcon: (
        <People
          color="primary"
          style={{ color: customColor, fontSize: fontSize }}
        />
      ),
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: (
        <Notifications style={{ color: notActiveColor, fontSize: fontSize }} />
      ),
      activeIcon: (
        <Notifications
          color="primary"
          style={{ color: customColor, fontSize: fontSize }}
        />
      ),
    },
  ];

  return (
    <>
      <header className="flex bg-white justify-between items-center px-[1%] py-[0.3rem] shadow-md fixed w-full top-0 z-10 ">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] mr-1 font-semibold text-blacks">
            <NavLink to="/">PinTech</NavLink>
          </h1>
          <div>
            <Link
              className="bg-backgroundButtonColor text-white px-7 py-2 rounded-[20px]"
              to="/pin/create"
            >
              Create Pin
            </Link>
          </div>
        </div>
        <div>
          <ul className="flex items-center font-normal w-[100%]">
            {navLinks.map(({ path, icon, activeIcon, name }, index) => (
              <li key={index} className="w-[150px] text-[18px]">
                <NavLink to={path}>
                  <div className="flex flex-col items-center">
                    {location.pathname === path ? activeIcon : icon}
                    <span
                      className={`text-xs text-NavlabelName`}
                      style={{
                        color: location.pathname === path ? "#3D91FD" : "",
                      }}
                    >
                      {name}
                    </span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex gap-1 items-center font-normal">
            <SearchBar />
            <div>
              <ProfileUtil />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default MainHeader;
