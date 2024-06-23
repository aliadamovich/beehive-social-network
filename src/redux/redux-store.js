import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { profileReducer } from "./reducers/profileReducer";
import { dialogReducer } from "./reducers/dialogsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { authReducer } from "./reducers/authReducer";
import { photoGridReducer } from "./reducers/photoGridReducer";

export let reducers = combineReducers({
	profilePage: profileReducer,
	dialoPage: dialogReducer,
	usersPage: usersReducer,
	auth: authReducer,
	grid: photoGridReducer
})

export let store = configureStore({ reducer: reducers })

window.store = store;