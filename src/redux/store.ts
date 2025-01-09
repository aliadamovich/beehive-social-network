import { combineReducers, UnknownAction } from "redux";
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { photoGridReducer } from "./reducers/photoGridReducer";
import { authReducer } from "./reducers/authSlice";
import { appReducer } from "./reducers/appSlice";
import { dialogsReducer } from "./reducers/dialogsSlice";
import { profileReducer } from "./reducers/profileSlice";
import { usersReducer } from "./reducers/usersSlice";

// export const rootReducer = combineReducers({
// 	profile: profileReducer,
// 	dialogs: dialogsReducer,
// 	users: usersReducer,
// 	auth: authReducer,
// 	grid: photoGridReducer,
// 	app: appReducer,
// })

export const store = configureStore({
	// reducer: rootReducer
	reducer: {
		profile: profileReducer,
		dialogs: dialogsReducer,
		users: usersReducer,
		auth: authReducer,
		grid: photoGridReducer,
		app: appReducer,
	},
})

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, UnknownAction>



//@ts-ignore
window.store = store;
