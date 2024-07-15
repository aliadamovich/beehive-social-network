import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { profileReducer } from "./reducers/profileReducer";
import { dialogReducer } from "./reducers/dialogsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { authReducer } from "./reducers/authReducer";
import { photoGridReducer } from "./reducers/photoGridReducer";

export const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialoPage: dialogReducer,
	usersPage: usersReducer,
	auth: authReducer,
	grid: photoGridReducer
})

export const store = configureStore({ reducer: rootReducer })

//rootReducer это ф-ция которая принимает глобальный стейт и возаращает глобальтный стейт. Чтобы протипизировать этот глобальный стейт
//есть ReturnType который типизирует то что возаращает ф-ция
// export type rootReducerType = typeof rootReducer
// export type AppStateType = ReturnType<rootReducerType>

//мои изменения: также с помощью ReturnType создаем тип для возвращаемого стейта (записываем в одну строку) и создаем тип для dispatch
//далее в отдельном файле hooks.ts 
//Хотя можно импортировать типы RootState и AppDispatch в каждый компонент, лучше создать предварительно типизированные версии хуков useDispatch и useSelector для использования в вашем приложении. Это важно по нескольким причинам: 
//для useSelector это избавит вас от необходимости каждый раз вводить (state: RootState). 
//Для useDispatch тип Dispatch по умолчанию не знает о thunk или другом middleware. Чтобы корректно dispatch thunks, вам нужно использовать специальный настроенный тип AppDispatch из store, который включает типы промежуточного ПО thunk, и использовать его с useDispatch. Добавление предварительно типизированного хука useDispatch позволит вам не забыть импортировать AppDispatch там, где это необходимо.
export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




//@ts-ignore
window.store = store;