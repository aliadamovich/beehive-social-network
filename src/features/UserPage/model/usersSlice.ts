import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "apiDal/apiDal";
import { setAppStatus } from "app/appSlice";
import { AppDispatch, AppStateType, AppThunk } from "app/store";
import { ResultCodesEnum } from "common/enums/enum";
import { UserType } from "features/UserPage/api/usersApi.types";


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
		// getUsersQuantity: create.reducer<{ quantity: number }>((state, action) => {
		// 	state.totalUsers = action.payload.quantity
		// }),
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
	extraReducers: (builder) => {
		builder
			.addCase(getUsersTC.fulfilled, (state, action) => {
			state.users = action.payload.users
			state.totalUsers = action.payload.totalCount
		})
			.addCase(followUserTC.fulfilled, (state, action) => {
				const user = state.users.find((u) => u.id === action.payload.userId)
				if (user) user.followed = !user.followed
			})
	},
	selectors: {
		selectUsers: (state) => state.users,
		selectSearchParams: (state) => state.searchParams,
		selectTotalUsers: (state) => state.totalUsers,
		selectFollowingInProgress: (state) => state.followingInProgress,
	},
})

export const usersReducer = usersSlice.reducer
export const { updateParams, resetSearchParams, toggleFollowingProgress } = usersSlice.actions
export const { selectSearchParams, selectTotalUsers, selectUsers, selectFollowingInProgress} = usersSlice.selectors

//utils
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppStateType,
	dispatch: AppDispatch,
	rejectValue: null
}>();

//* Thunks


export const getUsersTC = createAppAsyncThunk<{users: UserType[], totalCount: number} , getUsersParams>("users/getUsers", async (params, thunkAPI) => {
	const { dispatch, getState, rejectWithValue } = thunkAPI
	try {
		const searchParams = getState().users.searchParams
		const queryParams: RequestParams = { ...searchParams, ...params }
		// dispatch(setAppStatus({ status: "loading" }))
		const resp = await usersAPI.getUsers(queryParams)
		return {users: resp.data.items, totalCount: resp.data.totalCount}
	} catch (error) {
		return rejectWithValue(null)
	} finally {
		// dispatch(setAppStatus({ status: "success" }))
	}
})

export const followUserTC = createAppAsyncThunk<{userId: number}, number>("users/followUser", async (userId, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(toggleFollowingProgress({ isFetching: true, userId }))
			const isFollowed = await usersAPI.checkFollow(userId)

			const respData = isFollowed
			? await usersAPI.follow(userId) 
			: await usersAPI.unfollow(userId)
			
			if (respData.resultCode === ResultCodesEnum.Success) {
				return {userId}
			}
			return rejectWithValue(null)
		} catch (error) {
			return rejectWithValue(null)
		}
		finally{
			dispatch(toggleFollowingProgress({ isFetching: false, userId }))
		}
	}
)


//* Types
 type RequestParams = Required<getUsersParams>
 type getUsersParams = {
	count?: number
	page?: number
	term?: string
	friend?: boolean
}