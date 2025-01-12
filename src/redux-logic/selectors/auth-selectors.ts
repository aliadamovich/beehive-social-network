import { AppStateType } from "../redux-store";

export const getIsAuth = (state: AppStateType) => {
  return state.auth.profileData.isAuth;
};

export const getAuthorizedLoginId = (state: AppStateType) => {
  return state.auth.profileData.userId;
};

