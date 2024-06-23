import { usersAPI } from "../../apiDal/apiDal";

let initialState = {
	users: [],
	currentPage: 1,
	totalUsers: 0,
	usersOnPage: 9,
	isFetching: false,
	followingInProgress: [],
	// isFollowingInProgress: false
}

export const usersReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'TOGGLE-FOLLOW':
			return {

				users: state.users.map(u => {
					if (u.id === action.userId) {
						return {
							...u,
							followed: !u.followed
						};
					}
					return u;
				})
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

export const toggleFollowAC = (userId) => ({ type: 'TOGGLE-FOLLOW', userId })
export const setUsersAC =(users) => ({type: 'SET-USERS', users });

export const getUsersQuantityAC = (number) => ({ type: 'GET-USERS-QUANTITY', number });
export const changeCurrentPageAC = (num) => ({ type: 'CHANGE-CURRENT-PAGE', num});
export const loadMoreUsersAC = (users) => ({type: 'LOAD-MORE-USERS', users});
export const toggleIsFetchingAC = (isFetching) => ({ type: 'TOGGLE-IS-FETCHING', isFetching})
export const toggleFollowingProgressAC = (isFetching, userId) => ({ type: 'TOGGLE-FOLLOWING-PROGRESS', isFetching, userId})


export const getUsersThunkCreator = (currentPage, usersOnPage) => {
	return (dispatch) => {

		dispatch(toggleIsFetchingAC(true));

		usersAPI.getUsers(currentPage, usersOnPage).then(data => {
			dispatch(toggleIsFetchingAC(false));
			dispatch(setUsersAC(data.items));
			dispatch(getUsersQuantityAC(data.totalCount));
		})
	}
}

export const loadMoreUsersThunkCreator = (currentPage, usersOnPage) => {
	return async (dispatch) => {

		dispatch(toggleIsFetchingAC(true));

		const newPage = currentPage + 1;
		dispatch(changeCurrentPageAC(newPage));
		
		const response = await usersAPI.getUsers(newPage, usersOnPage);
		
		dispatch(loadMoreUsersAC(response.items));
		dispatch(toggleIsFetchingAC(false));
	}
}

export const followUsersThunkCreator = (userId) => {
	return (dispatch) => {

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