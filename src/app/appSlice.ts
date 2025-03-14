import { createSlice, isRejected } from "@reduxjs/toolkit";


export const appSlice = createSlice({
	name: "app",
	initialState: {
		error: null as string | null,
		status: "idle" as AppStatusType,
	},
	reducers: (create) => ({
		setAppError: create.reducer<{ error: null | string }>((state, action) => {
			state.error = action.payload.error
		}),
		resetAppError: create.reducer((state) => {
			state.error = null;
		}),
		setAppStatus: create.reducer<{ status: AppStatusType }>((state, action) => {
			state.status = action.payload.status
		}),
	}),
	// extraReducers(builder) {
	// 	builder.addMatcher(isRejected, (state, action) => {
	// 		debugger
	// 	})
	// },
	selectors: {
		selectStatus: state => state.status,
		selectError: state => state.error
	}
})

export const appReducer = appSlice.reducer
export const {setAppError, resetAppError, setAppStatus} = appSlice.actions
export const {selectError, selectStatus} = appSlice.selectors


//* Thunks
//инициализация приложения


//* Types

export type InitialAppStateType = ReturnType<typeof appSlice.getInitialState>;
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'
