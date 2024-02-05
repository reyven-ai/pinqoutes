import { Dispatch } from "redux";

// In your pin actions file

export const addToSave = (pin: { id: string }) => {
  return (dispatch: Dispatch) => {
    console.log("Adding to save:", pin);

    dispatch({
      type: "ADD_TO_SAVE",
      payload: pin,
    });

    const savePins = localStorage.getItem("saves");
    if (savePins) {
      const saves: { id: string }[] = JSON.parse(savePins);
      console.log("Current saves:", saves);

      if (!saves.some((p) => p.id === pin.id)) {
        saves.push(pin);
        localStorage.setItem("saves", JSON.stringify(saves));
        console.log("Saved to local storage:", saves);
      }
    }
  };
};

export const removeFromSave = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "REMOVE_FROM_SAVE",
      payload: { id: id },
    });

    const savePins = localStorage.getItem("saves");
    if (savePins) {
      const saves: { id: string }[] = JSON.parse(savePins);
      const updatedSave = saves.filter((p) => p.id !== id);
      localStorage.setItem("saves", JSON.stringify(updatedSave));
    }
  };
};
