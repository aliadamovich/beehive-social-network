import { AppStateType } from "../redux-store";

export const getPhotoGrid = (state: AppStateType) => {
  return state.grid.photoGrid;
};
