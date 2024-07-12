import { useState } from "react";
import { MoreHoriz } from "@material-ui/icons";

import { usePinAction } from "@/hooks/usePinAction";
import { useParams } from "react-router-dom";
import PinMenuModal from "../Modal/PinMenuModal";
import PinUpdate from "../pin/Pin.Update";

function MenuDropdown() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleDeletePin } = usePinAction();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletePin = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this pin?"
    );
    if (userConfirmed) {
      await handleDeletePin(id || "");
      closeModal();
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          onClick={openModal}
          className="cursor-pointer bg-[#e4e6eb] rounded-[50%]"
        >
          <MoreHoriz className="mx-2.5 my-2.5" />
        </button>
        {isModalOpen && (
          <PinMenuModal onClose={closeModal}>
            <div className="absolute right-0 mt-8 bg-white border rounded shadow-md w-[200px] px-3 py-2">
              <ul>
                <li className="mb-[5px]">
                  <button>
                    <PinUpdate />
                  </button>
                </li>
                <li>
                  <button className="font-semibold" onClick={deletePin}>
                    Delete Pin
                  </button>
                </li>
              </ul>
              {/* )} */}
            </div>
          </PinMenuModal>
        )}
      </div>
    </div>
  );
}

export default MenuDropdown;
