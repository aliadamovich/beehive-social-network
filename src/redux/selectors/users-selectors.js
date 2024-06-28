import { createSelector } from "reselect";

export const obtainUsers = (state) => {
	return state.usersPage.users;
}

export const getTotalUsers = (state) => {
	return state.usersPage.totalUsers;
}

export const getUsersOnPage = (state) => {
	return state.usersPage.usersOnPage;
}

export const setCurrentPage = (state) => {
	return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
	return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
	return state.usersPage.followingInProgress;
}

// export const getUsersSuperSelector = createSelector(obtainUsers, (users) => {
// 	return users.filter(u => true)
// })