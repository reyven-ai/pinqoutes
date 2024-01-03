import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../Searchbar/SearchBar";
import ProfileUtil from "../DropdownUtil/ProfileDropdown";
import MenuDropdown from "../DropdownUtil/MenuDropdown";
import { checkAuthLoader } from "@/services/auth.util";
import { Home, Notifications, People, YouTube, Chat } from "@material-ui/icons";

function MainHeader() {
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
      icon: <Home style={{ color: notActiveColor, fontSize: fontSize }} />,
      activeIcon: <Home style={{ color: customColor, fontSize: fontSize }} />,
    },
    {
      path: "/watch",
      icon: <YouTube style={{ color: notActiveColor, fontSize: fontSize }} />,
      activeIcon: (
        <YouTube style={{ color: customColor, fontSize: fontSize }} />
      ),
    },
    {
      path: "/friend",
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
            {navLinks.map(({ path, icon, activeIcon }, index) => (
              <li key={index} className="w-[150px] text-[18px]">
                <NavLink to={path}>
                  {location.pathname === path ? activeIcon : icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex gap-3 items-center font-normal">
            <li>
              <MenuDropdown />
            </li>
            <li>
              <Chat />
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
