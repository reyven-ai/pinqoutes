import { useState } from "react";
import { MoreHoriz, Bookmark, Image } from "@material-ui/icons";

function MenuDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="relative">
        <div onClick={dropdownOpen} className="cursor-pointer">
          <MoreHoriz />
        </div>
        {isDropdownOpen && (
          <div className="absolute top-3 right-0 mt-8 bg-white border rounded shadow-md w-[350px] px-3 py-2">
            <h2 className="font-semibold mb-4">Collection</h2>
            <ul>
              <li className="mb-[1rem] flex items-center gap-2">
                <Image />
                Created Post
              </li>
              <li className="mb-[1rem] flex items-center gap-1">
                <Bookmark />
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
