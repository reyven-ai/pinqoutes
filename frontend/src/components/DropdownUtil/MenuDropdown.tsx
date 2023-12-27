import { useState } from "react";
import Settings from "../../assets/settings.png";
import Moon from "../../assets/moon.png";
import Menu from "../../assets/menu.png";

function MenuDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="relative">
        <div onClick={dropdownOpen} className="cursor-pointer">
          <img className="w-[52px] h-[52px] rounded-[50%]" src={Menu} alt="" />
        </div>
        {isDropdownOpen && (
          <div className="absolute top-3 right-0 mt-8 bg-white border rounded shadow-md w-[350px] px-3 py-2">
            <h2 className="font-semibold mb-4">Collection</h2>
            <ul>
              <li className="mb-[1rem] flex items-center gap-2 ml-[0.3rem]">
                <img className="w-[31px] h-[31px]" src={Moon} alt="" /> Created
                Post
              </li>
              <li className="mb-[1rem] flex items-center gap-1">
                <img className="w-[40px] h-[40px]" src={Settings} alt="" />{" "}
                Saved Post
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuDropdown;
