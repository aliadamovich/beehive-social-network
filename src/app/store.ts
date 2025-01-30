import { combineReducers, UnknownAction } from "redux";
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { appReducer } from "./appSlice";
import { profileReducer } from "features/ProfilePage/model/profileSlice";
import { dialogsReducer } from "features/DialogsPage/model/dialogsSlice";
import { usersReducer } from "features/UserPage/model/usersSlice";
import { baseApi } from "app/baseApi";
import { authReducer } from "features/LoginPage/model/authSlice";
import { galleryReducer } from "features/GalleryPage/model/gallerySlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		dialogs: dialogsReducer,
		users: usersReducer,
		auth: authReducer,
		gallery: galleryReducer,
		app: appReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})
setupListeners(store.dispatch)

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, UnknownAction>


//@ts-ignore
window.store = store;
