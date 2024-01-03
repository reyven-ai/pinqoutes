import { useState } from "react";
import { MoreHoriz, Bookmark, Image } from "@material-ui/icons";
import DropDownModal from "../Modal/DropDownModal";

function MenuDropdown() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="relative">
        <button onClick={openModal} className="cursor-pointer">
          <MoreHoriz />
        </button>
        {isModalOpen && (
          <DropDownModal onClose={closeModal}>
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
          </DropDownModal>
        )}
      </div>
    </div>
  );
}

export default MenuDropdown;
