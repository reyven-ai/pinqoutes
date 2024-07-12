import React, { useContext } from "react";
import { getCurrentUserId } from "@/services/auth.util";

import { useSavePinqoutes } from "@/hooks/useSave";
import saved from "../../../assets/bookmarkWhite.svg";
import savedActive from "../../../assets/bookmarkActive.svg";

interface SaveComponentProps {
  pinId: string;
}

const SaveButton: React.FC<SaveComponentProps> = ({ pinId }) => {
  const loggedInUserId = getCurrentUserId();
  const { save, savePin, unsavePin, loading, error } = useSavePinqoutes(
    loggedInUserId,
    pinId
  );

  const handleSave = async () => {
    if (!loggedInUserId) {
      console.error("User is not logged in");
      return;
    }
    if (save) {
      await unsavePin(); // Unsave if already saved
    } else {
      await savePin(); // Save if not already saved
    }
  };
  return (
    <>
      <button onClick={handleSave} disabled={loading || !loggedInUserId}>
        <img src={save ? savedActive : saved} alt="Save Icon" />
      </button>
      {error && <p>{error}</p>}
    </>
  );
};

export default SaveButton;
