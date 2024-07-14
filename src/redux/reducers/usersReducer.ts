import { usersAPI } from "../../apiDal/apiDal";
import { PhotosType, UserType } from "../../types/types";


let initialState = {
	users: [] as Array<UserType>,
	currentPage: 1,
	totalUsers: 0,
	usersOnPage: 9,
	isFetching: false,
	followingInProgress: [] as Array<number>, //Array od usersId
}
type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action: any): InitialStateType => {

	switch (action.type) {
		case 'TOGGLE-FOLLOW':
			return {
				...state, 
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return {
							...u,
							followed: !u.followed
						};
					}
					return u;
				}),
			}

		case 'SET-USERS':
			return { ...state, users: action.users }

		case 'GET-USERS-QUANTITY':
			return {
				...state, totalUsers: action.number }

		case 'CHANGE-CURRENT-PAGE':
			return{
				...state, 
				currentPage: action.num
			}
		case 'LOAD-MORE-USERS':
			 return{
				...state,
				users: [...state.users, ...action.users]
			 }
			case 'TOGGLE-IS-FETCHING':
				return {
					...state,
					isFetching: action.isFetching
				}
		case 'TOGGLE-FOLLOWING-PROGRESS':
			return {
				...state,
				followingInProgress: action.isFetching 
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}

		default:
			return state;
	}
}

type ToggleFollowActionType = {type: 'TOGGLE-FOLLOW', userId: number }
type SetUsersActionType = {type: 'SET-USERS', users: Array<UserType> }
type GetUsersQuantityActionType = {type: 'GET-USERS-QUANTITY', number: number }
type ChangeCurrentPageActionType = {type: 'CHANGE-CURRENT-PAGE', num: number }
type LoadMoreUsersActionType = {type: 'LOAD-MORE-USERS', users: Array<UserType> }
type ToggleIsFetchingActionType = {type: 'TOGGLE-IS-FETCHING', isFetching: boolean }
type ToggleFollowingProgresssActionType = {type: 'TOGGLE-FOLLOWING-PROGRESS', isFetching: boolean, userId: number }

export const toggleFollowAC = (userId: number): ToggleFollowActionType => ({ type: 'TOGGLE-FOLLOW', userId })
export const setUsersAC =(users: Array<UserType>): SetUsersActionType => ({type: 'SET-USERS', users });
export const getUsersQuantityAC = (number: number): GetUsersQuantityActionType => ({ type: 'GET-USERS-QUANTITY', number });
export const changeCurrentPageAC = (num: number): ChangeCurrentPageActionType => ({ type: 'CHANGE-CURRENT-PAGE', num});
export const loadMoreUsersAC = (users: Array<UserType>): LoadMoreUsersActionType => ({type: 'LOAD-MORE-USERS', users});
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: 'TOGGLE-IS-FETCHING', isFetching})
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number): ToggleFollowingProgresssActionType => ({ type: 'TOGGLE-FOLLOWING-PROGRESS', isFetching, userId})


export const getUsersThunkCreator = (currentPage: number, usersOnPage: number, isFriend = false) => {
	return (dispatch: any) => {

		dispatch(toggleIsFetchingAC(true));

		usersAPI.getUsers(currentPage, usersOnPage, isFriend).then(data => {
			dispatch(toggleIsFetchingAC(false));
			dispatch(setUsersAC(data.items));
			dispatch(getUsersQuantityAC(data.totalCount));
		})
	}
}


export const loadMoreUsersThunkCreator = (currentPage: number, usersOnPage: number) => {
	return async (dispatch: any) => {

		dispatch(toggleIsFetchingAC(true));

		const newPage = currentPage + 1;
		dispatch(changeCurrentPageAC(newPage));
		
		const response = await usersAPI.getUsers(newPage, usersOnPage);
		
		dispatch(loadMoreUsersAC(response.items));
		dispatch(toggleIsFetchingAC(false));
	}
}


export const followUsersThunkCreator = (userId: number) => {
	return (dispatch: any) => {

		usersAPI.checkFollow(userId)
			.then(data => {
				if (data === false) {
					usersAPI.follow(userId)
						.then(
							data => {
								if (data.resultCode === 0) dispatch(toggleFollowAC(userId))
							}
						)
				}
				else {
					usersAPI.unfollow(userId).then(data => {
						if (data.resultCode === 0) dispatch(toggleFollowAC(userId))
					})
				}
			})
	}
}