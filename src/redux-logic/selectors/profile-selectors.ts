import { AppStateType } from "../redux-store";

export const getProfile = (state: AppStateType) => {
	return state.profile.userProfile;
}

export const getStatus = (state: AppStateType) => {
	return state.profile.userStatus
}

export const getPosts = (state: AppStateType) => {
	return state.profile.posts
}

