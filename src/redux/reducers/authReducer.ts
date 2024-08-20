import { authAPI, profileAPI, ResultCodesEnum } from "../../apiDal/apiDal";
import { PhotosType } from "../../types/types";

type InitialStateType = typeof initialState;

let initialState = {
	initialized: false,
	userId: null as number | null, 
	login: null as string | null, 
	email: null as string | null, 
	isAuth: false,
	photos: null as PhotosType | null
}

export const authReducer = (state = initialState, action: any): InitialStateType => {

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

type InitializedSuccessActionType = {
	type: 'INITIALIZE-SUCCESS'
}

type PayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  photos: PhotosType | null;
};
type authProfileActionType = {
	type: 'SET-AUTH-PROFILE'
	payload: PayloadType
}

const setInitializedSuccessAC = (): InitializedSuccessActionType => ({ type: 'INITIALIZE-SUCCESS' })
const setAuthProfileIdAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, photos: PhotosType | null): authProfileActionType => (
	{ type: 'SET-AUTH-PROFILE', payload: { userId, email, login, isAuth, photos } }
)

//инициализация приложения
export const initializeAppThunkCreator = () => {
	return function (dispatch: any) {
		let promise = dispatch(getAuthUserDataThunkCreator());
		promise.then(() => {
			dispatch(setInitializedSuccessAC());
		})
	}
}

//auth.me
export const getAuthUserDataThunkCreator = () => {
	return async function(dispatch: any) {
		const resp = await authAPI.me();
		if (resp.data.resultCode === ResultCodesEnum.Success) {
			const { id, email, login } = resp.data.data //деструктуризируем полученный с сервера объект 

			const profileResp = await profileAPI.setProfile(id); //добавила асинхронный запрос профиля для получения фото для хэдера
			
			dispatch(setAuthProfileIdAC(id, email, login, true, profileResp.data.photos)); //добавляем флаг isAuth и фото поьзователя
		}
	}
}

//thunkcreator для login
export const LoginThunkCreator = (email: string, password: string) => {
	return function (dispatch: any) {
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
	return function (dispatch: any) {
		authAPI.logout()
			.then(resp => {
				if (resp.data.resultCode === 0) {
					dispatch(setAuthProfileIdAC(null, null, null, false, null));
				}
			})
	}
}