import { authAPI, profileAPI, ResultCodesEnum } from "../../apiDal/apiDal";
import { PhotosType } from "../../types/types";
import { handleNetworkError, handleServerError } from "../../utils/errorHandlers";
import { AppThunk } from "../redux-store";
import { setAppStatusAC } from "./appReducer";


let initialState = {
	initialized: false,
	isAuth: false,

	userId: null as number | null, 
	login: null as string | null, 
	email: null as string | null,
	photos: null as PhotosType | null,
}

export const _authReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
const setAuthProfileIdAC = ({ userId, email, login, isAuth, photos }: ProfileData) =>
	({
		type: "SET-AUTH-PROFILE",
		payload: { userId, email, login, isAuth, photos },
	} as const)



//* Thunks
//auth.me
export const _getMeTC = (): AppThunk<Promise<void>> => {
return async(dispatch) => {
  try {
		// dispatch(setAppStatusAC("loading"));
  	const resp = await authAPI.me();
  	if (resp.data.resultCode === ResultCodesEnum.Success) {
			const { id, email, login } = resp.data.data //деструктуризируем полученный с сервера объект
			const profileResp = await profileAPI.setProfile(id) //загружаем данные профайла с сервера по полученному id
			//добавила асинхронный запрос профиля для получения фото для хэдера
			dispatch(setAuthProfileIdAC({ userId: id, email, login, isAuth: true, photos: profileResp.data.photos })) //добавляем флаг isAuth и фото поьзователя
		} else {
  		handleServerError(dispatch, resp.data)
  	}
  } catch (error) {
  		handleNetworkError(dispatch, error as { message: string });
  }
  	finally {
  		dispatch(setInitializedSuccessAC())
			// dispatch(setAppStatusAC("success"));
  	}; //перенеса инициализацию сюда
  }
};

//TC для login
export const _LoginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
	return function (dispatch) {
		dispatch(setAppStatusAC('loading'))
		authAPI.login(email, password, rememberMe)
		.then(resp => {
			if (resp.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAppStatusAC("success"));
        dispatch(_getMeTC());
      } else {
        handleServerError(dispatch, resp.data);
      }
		})
		.catch((err) => handleNetworkError(dispatch, err))
	}
}

//thunkcreator для logout
export const _LogoutThunkCreator = (): AppThunk<Promise<void>> => {
  return function (dispatch) {
    dispatch(setAppStatusAC("loading"));
    return authAPI.logout()
      .then((resp) => {
        if (resp.data.resultCode === ResultCodesEnum.Success) {
          dispatch(setAppStatusAC("success"));
          dispatch(setAuthProfileIdAC({ email: null, login: null, userId: null, isAuth: false, photos: null }))
        } else {
          handleServerError(dispatch, resp.data);
        }
      })
      .catch((err) => handleNetworkError(dispatch, err));
  };
};


//* Types
type InitializedSuccessActionType = ReturnType<typeof setInitializedSuccessAC>;
type authProfileActionType = ReturnType<typeof setAuthProfileIdAC>;
type ActionsType = InitializedSuccessActionType | authProfileActionType;
type InitialStateType = typeof initialState;
type ProfileData = {userId: number | null, email: string | null, login: string | null, isAuth: boolean, photos: PhotosType | null}