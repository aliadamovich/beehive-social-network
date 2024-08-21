import { AppStateType } from "../redux-store";

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getAuthorizedLoginId = (state: AppStateType) => {
  return state.auth.userId;
};

