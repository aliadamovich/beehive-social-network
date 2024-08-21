import { AppStateType } from "../redux-store";

export const getProfile = (state: AppStateType) => {
	return state.profilePage.userProfile;
}

export const getStatus = (state: AppStateType) => {
	return state.profilePage.status;
}

export const getPosts = (state: AppStateType) => {
	return state.profilePage.posts;
}

// export const getCurrentPage = (state: AppStateType) => {
// 	return state.usersPage.currentPage;
// }
