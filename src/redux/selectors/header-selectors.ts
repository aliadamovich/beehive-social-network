import { AppStateType } from "../redux-store";

export const getLogin = (state: AppStateType) => {
	return state.auth.login;
}

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getAuthUserPhotos = (state: AppStateType) => {
  return state.auth.photos;
};