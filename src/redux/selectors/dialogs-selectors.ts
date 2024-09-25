import { AppStateType } from "../redux-store";

export const getMessages = (state: AppStateType) => {
  return state.dialoPage.dialogs;
};
