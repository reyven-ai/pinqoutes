import { useSaveUserPin, useRemoveUserPin } from "@/hooks/useUsersPins";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUserId } from "@/services/auth.util";

const SavePinButton = () => {
  const { savePin } = useSaveUserPin();
  const { removePin } = useRemoveUserPin();
  const { id } = useParams();
  const [isPinInSaves, setIsPinInSaves] = useState(false);
  const loggedInUserId = getCurrentUserId();

  useEffect(() => {
    const savedState = localStorage.getItem("savedState");
    if (savedState) {
      setIsPinInSaves(JSON.parse(savedState));
    }
  }, []);

  const handleSavePin = async () => {
    if (loggedInUserId && id) {
      if (isPinInSaves) {
        await removePin(loggedInUserId, id);
      } else {
        await savePin(loggedInUserId, id);
      }
      setIsPinInSaves(!isPinInSaves);
      localStorage.setItem("savedState", JSON.stringify(!isPinInSaves));
    } else {
      console.error("User ID or Pin ID is missing");
    }
  };

  return (
    <div>
      <button
        onClick={handleSavePin}
        className="bg-backgroundButtonColor px-6 py-2 text-white rounded-[20px]"
      >
        {isPinInSaves ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default SavePinButton;