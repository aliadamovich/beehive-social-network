import { createSelector } from "reselect";
import { AppStateType } from "../redux-store";

export const obtainUsers = (state: AppStateType) => {
	return state.usersPage.users;
}

export const getTotalUsers = (state: AppStateType) => {
	return state.usersPage.totalUsers;
}

export const getUsersOnPage = (state: AppStateType) => {
	return state.usersPage.usersOnPage;
}

export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress;
}

// export const getUsersSuperSelector = createSelector(obtainUsers, (users) => {
// 	return users.filter(u => true)
// })