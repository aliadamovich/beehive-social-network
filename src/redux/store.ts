import { combineReducers, UnknownAction } from "redux";
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { usersReducer } from "./reducers/usersReducer";
import { photoGridReducer } from "./reducers/photoGridReducer";
import { authReducer } from "./reducers/authSlice";
import { appReducer } from "./reducers/appSlice";
import { dialogsReducer } from "./reducers/dialogsSlice";
import { profileReducer } from "./reducers/profileSlice";

export const rootReducer = combineReducers({
	profile: profileReducer,
	dialogs: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	grid: photoGridReducer,
	app: appReducer,
})

export const store = configureStore({
	reducer: rootReducer
	// reducer: {
	// 	profilePage: profileReducer,
	// 	dialoPage: dialogReducer,
	// 	usersPage: usersReducer,
	// 	auth: authReducer,
	// 	grid: photoGridReducer,
	// 	app: appReducer,
	// },
})

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, UnknownAction>



//@ts-ignore
window.store = store;
