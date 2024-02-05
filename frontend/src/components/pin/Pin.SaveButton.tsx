import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToSave, removeFromSave } from "@/store/actions/pin";

import { Pin, RootState } from "@/types/pin.types";

const SaveButton: React.FC<{ pin: Pin }> = ({ pin }) => {
  const dispatch = useDispatch();
  const saves = useSelector((state: RootState) => state.saves);

  const isPinInSaves = saves.some((savePin) => savePin.id === pin.id);

  const handleToggleFavorites = () => {
    if (isPinInSaves) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(removeFromSave(pin.id) as any);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(addToSave(pin) as any);
    }
  };

  return (
    <div>
      <button
        onClick={handleToggleFavorites}
        className="bg-backgroundButtonColor px-6 py-2 text-white rounded-[20px]"
      >
        {isPinInSaves ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default SaveButton;
