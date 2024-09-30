import { combineReducers, UnknownAction } from "redux";
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { profileReducer } from "./reducers/profileReducer";
import { dialogReducer } from "./reducers/dialogsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { authReducer } from "./reducers/authReducer";
import { photoGridReducer } from "./reducers/photoGridReducer";
import { appReducer } from "./reducers/appReducer";

export const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialoPage: dialogReducer,
	usersPage: usersReducer,
	auth: authReducer,
	grid: photoGridReducer,
	app: appReducer
})

export const store = configureStore({ reducer: rootReducer })

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, UnknownAction>



//@ts-ignore
window.store = store;