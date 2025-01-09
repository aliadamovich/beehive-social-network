import { createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../apiDal/apiDal";
import { UserType } from "../../types/types";
import { setAppStatus } from "./appSlice";
import { AppThunk } from "../store";

const initialState = {
	users: [] as Array<UserType>,
	totalUsers: 0,
	followingInProgress: [] as Array<number>,
	searchParams: {
		count: 10,
		page: 1,
		term: "",
		friend: false,
	},
}
export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: (create) => ({
		setUsers: create.reducer<{ users: UserType[] }>((state, action) => {
			state.users = action.payload.users
		}),
		getUsersQuantity: create.reducer<{ quantity: number }>((state, action) => {
			state.totalUsers = action.payload.quantity
		}),
		toggleFollow: create.reducer<{ userId: number }>((state, action) => {
			const user = state.users.find((u) => u.id === action.payload.userId)
			if (user) user.followed = !user.followed
		}),
		toggleFollowingProgress: create.reducer<{ isFetching: boolean; userId: number }>((state, action) => {
			if (action.payload.isFetching) {
				state.followingInProgress.push(action.payload.userId)
			} else {
				state.followingInProgress = state.followingInProgress.filter((id) => id !== action.payload.userId)
			}
		}),
		updateParams: create.reducer<{ params: getUsersParams }>((state, action) => {
			state.searchParams = { ...state.searchParams, ...action.payload.params }
		}),
		resetSearchParams: create.reducer((state) => {
			state.searchParams = { ...initialState.searchParams }
		}),
	}),
	selectors: {
		selectUsers: (state) => state.users,
		selectSearchParams: (state) => state.searchParams,
		selectTotalUsers: (state) => state.totalUsers,
		selectFollowingInProgress: (state) => state.followingInProgress,
	},
})

export const usersReducer = usersSlice.reducer
export const { getUsersQuantity, updateParams, resetSearchParams, setUsers, toggleFollow, toggleFollowingProgress } =
	usersSlice.actions
export const { selectSearchParams, selectTotalUsers, selectUsers, selectFollowingInProgress} = usersSlice.selectors



//* Thunks


export type RequestParams = Required<getUsersParams>

export const getUsersThunkCreator = (params: getUsersParams): AppThunk<Promise<any>> => {
	
	return async (dispatch, getState) => {
		const searchParams = getState().users.searchParams
		const queryParams: RequestParams = { ...searchParams, ...params }

		dispatch(setAppStatus({ status: "loading" }))
		const resp = await usersAPI.getUsers(queryParams)
		dispatch(setAppStatus({ status: "success" }))
		// dispatch(updateParams({params: queryParams}))
		dispatch(setUsers({ users: resp.data.items }))
		dispatch(getUsersQuantity({ quantity: resp.data.totalCount }))
	}
}


export const followUsersThunkCreator = (userId: number): AppThunk => {
  return async (dispatch) => {
		// debugger
		dispatch(toggleFollowingProgress({isFetching: true, userId}));

    const isFollowed = await usersAPI.checkFollow(userId);
		let respData;
    if (isFollowed === false) {
      respData = await usersAPI.follow(userId);
    } else {
      respData = await usersAPI.unfollow(userId);
    }

		if (respData.resultCode === 0) {
      dispatch(toggleFollow({userId}));
    }
		dispatch(toggleFollowingProgress({isFetching: false, userId}));
		
  };
};



// export const loadMoreUsersThunkCreator = (currentPage: number, usersOnPage: number): AppThunk => {
// 	return async (dispatch) => {
//     dispatch(toggleIsFetchingAC(true));
//     const newPage = currentPage + 1;
//     dispatch(changeCurrentPageAC(newPage));

//     const response = await usersAPI.getUsers(newPage, usersOnPage);

//     dispatch(loadMoreUsersAC(response.items));
//     dispatch(toggleIsFetchingAC(false));
//   };
// }

//* Types

export type getUsersParams = {
	count?: number
	page?: number
	term?: string
	friend?: boolean
}