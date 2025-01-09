import { combineReducers, UnknownAction } from "redux";
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { _usersReducer } from "./reducers/usersReducer";
import { photoGridReducer } from "./reducers/photoGridReducer";
import { _appReducer } from "./reducers/appReducer";
import { _authReducer } from "./reducers/authReducer";
import { _dialogReducer } from "./reducers/dialogsReducer";
import { _profileReducer } from "./reducers/profileReducer";

export const rootReducer = combineReducers({
	profile: _profileReducer,
	dialogs: _dialogReducer,
	usersPage: _usersReducer,
	auth: _authReducer,
	grid: photoGridReducer,
	app: _appReducer,
})

export const _store = configureStore({
	reducer: rootReducer
})

export type AppStateType = ReturnType<typeof _store.getState>;
export type AppDispatch = typeof _store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, UnknownAction>



//@ts-ignore
window.store = store;
