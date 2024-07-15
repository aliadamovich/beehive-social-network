import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { profileReducer } from "./reducers/profileReducer";
import { dialogReducer } from "./reducers/dialogsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { authReducer } from "./reducers/authReducer";
import { photoGridReducer } from "./reducers/photoGridReducer";

export let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialoPage: dialogReducer,
	usersPage: usersReducer,
	auth: authReducer,
	grid: photoGridReducer
})

//rootReducer это ф-ция которая принимает глобальный стейт и возаращает глобальтный стейт. Чтобы протипизировать этот глобальный стейт
//есть ReturnType который типизирует то что возаращает ф-ция

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>


export let store = configureStore({ reducer: rootReducer })

//@ts-ignore
window.store = store;