import { authAPI, profileAPI, ResultCodesEnum } from "../../apiDal/apiDal";
import { PhotosType } from "../../types/types";
import { handleNetworkError, handleServerError } from "../../utils/errorHandlers";
import { AppThunk } from "../redux-store";
import { setAppErrorAC, setAppStatusAC } from "./appReducer";

let initialState = {
	initialized: false,
	userId: null as number | null, 
	login: null as string | null, 
	email: null as string | null, 
	isAuth: false,
	photos: null as PhotosType | null
}

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
//* Action Creators
const setInitializedSuccessAC = () => ({ type: 'INITIALIZE-SUCCESS' } as const)
const setAuthProfileIdAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, photos: PhotosType | null) =>
  ({
    type: "SET-AUTH-PROFILE",
    payload: { userId, email, login, isAuth, photos },
  } as const);


	//* Thunks
//инициализация приложения
export const initializeAppThunkCreator = (): AppThunk => {
  return (dispatch) => {
   return dispatch(getAuthUserDataThunkCreator())
    .then(() => {
      dispatch(setInitializedSuccessAC());
    });
  };
};

//auth.me
export const getAuthUserDataThunkCreator = (): AppThunk => {

 return (dispatch) => {
   return authAPI.me()
	 	.then((resp) => {

		if (resp.data.resultCode === ResultCodesEnum.Success) {
			const { id, email, login } = resp.data.data; //деструктуризируем полученный с сервера объект
			 profileAPI.setProfile(id)
			.then((profileResp) => {
			//добавила асинхронный запрос профиля для получения фото для хэдера
			 dispatch(setAuthProfileIdAC(id, email, login, true, profileResp.data.photos)); //добавляем флаг isAuth и фото поьзователя
			})
		} else {
			// handleServerError(dispatch, resp.data)
		}
	 })
	 .catch((err) => {

	 })
 };
};

//thunkcreator для login
export const LoginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
	return function (dispatch) {
		dispatch(setAppStatusAC('loading'))
		authAPI.login(email, password, rememberMe)
		.then(resp => {
			if (resp.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAppStatusAC("success"));
        dispatch(getAuthUserDataThunkCreator());
      } else {
        handleServerError(dispatch, resp.data);
      }
		})
		.catch((err) => {
			console.log(err)
			handleNetworkError(dispatch, err);
		})
	}
}

//thunkcreator для logout
export const LogoutThunkCreator = (): AppThunk => {
	return function (dispatch) {
		authAPI.logout()
			.then(resp => {
				if (resp.data.resultCode === 0) {
					dispatch(setAuthProfileIdAC(null, null, null, false, null));
				}
			})
	}
}


//* Types
type InitializedSuccessActionType = ReturnType<typeof setInitializedSuccessAC>;
type authProfileActionType = ReturnType<typeof setAuthProfileIdAC>;
type ActionsType = InitializedSuccessActionType | authProfileActionType;
type InitialStateType = typeof initialState;