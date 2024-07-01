import { authAPI } from "../../apiDal/apiDal";
import { getUserProfileThunkCreator } from "./profileReducer";

let initialState = {
	initialized: false,
	userId: null, 
	login: null, 
	email: null,
	isAuth: false
}

export const authReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'INITIALIZE-SUCCESS':
			return {
				...state,
				initialized: true
			}

		case 'SET-AUTH-PROFILE':
			return {
				...state,
				...action.payload,
			}

		default: return state
	}
}

const setInitializedSuccessAC = () => ({ type: 'INITIALIZE-SUCCESS' })
const setAuthProfileIdAC = (userId, email, login, isAuth) => ({ type: 'SET-AUTH-PROFILE', payload: { userId, email, login, isAuth } })

//инициализация приложения
export const initializeAppThunkCreator = () => {
	return function (dispatch) {
		let promise = dispatch(getAuthUserDataThunkCreator());
		promise.then(() => {
			dispatch(setInitializedSuccessAC());
		})
	}
}

//auth.me
export const getAuthUserDataThunkCreator = () => {
	return async function(dispatch) {
		const resp = await authAPI.me();
		if (resp.data.resultCode === 0) {
			const { id, email, login } = resp.data.data //деструктуризируем полученный с сервера объект 
			dispatch(setAuthProfileIdAC(id, email, login, true)); //добавляем флаг isAuth

			//я сделала этот запрос для отображения фото в хэдере но не сработало
			// dispatch(getUserProfileThunkCreator(resp.data.data.id));
		}
	}
}

//thunkcreator для login
export const LoginThunkCreator = (email, password) => {
	return function (dispatch) {
		authAPI.login(email, password)
		.then(resp => {
			if (resp.data.resultCode === 0) {
				dispatch(getAuthUserDataThunkCreator())
			}
		})
	}
}

//thunkcreator для logout
export const LogoutThunkCreator = () => {
	return function (dispatch) {
		authAPI.logout()
			.then(resp => {
				if (resp.data.resultCode === 0) {
					dispatch(setAuthProfileIdAC(null, null, null, false));
				}
			})
	}
}