import { Pin, State, Action } from "../../types/pin.types";

const initialState: State = {
  saves: [],
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_SAVE":
      if (!state.saves.some((pin: Pin) => pin.id === action.payload.id)) {
        return {
          ...state,
          saves: [...state.saves, action.payload],
        };
      }
      return state;

    case "REMOVE_FROM_SAVE":
      return {
        ...state,
        saves: state.saves.filter((pin: Pin) => pin.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default reducer;
