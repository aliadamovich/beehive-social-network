import { createSlice } from "@reduxjs/toolkit";
import { authAPI, profileAPI, ResultCodesEnum } from "../../apiDal/apiDal";
import { PhotosType } from "../../types/types";
import { handleNetworkError, handleServerError } from "../../utils/errorHandlers";
import { AppThunk } from "../redux-store";
import { setAppStatus } from "./appSlice";


export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isInitialized: false,
		profileData: {
			isAuth: false,
			userId: null as number | null,
			login: null as string | null,
			email: null as string | null,
			photos: null as PhotosType | null,
		},
	},
	reducers: (create) => ({
		setInitializedSuccess: create.reducer((state) => {
			state.isInitialized = true
		}),
		setAuthProfile: create.reducer<ProfileData>((state, action) => {
			state.profileData = action.payload
		}),
	}),
	selectors: {
		selectIsAuth: (state) => state.profileData.isAuth,
		selectAuthorizedLoginId: (state) => state.profileData.userId,
		selectIsInitialized: (state) => state.isInitialized,
		selectProfileData: (state) => state.profileData
	},
})


export const authReducer = authSlice.reducer;
export const {setAuthProfile, setInitializedSuccess} = authSlice.actions
export const { selectAuthorizedLoginId, selectIsAuth, selectIsInitialized, selectProfileData } = authSlice.selectors

//* Thunks
//auth.me
export const getMeTC = (): AppThunk<Promise<void>> => {
return async(dispatch) => {
  try {
		// dispatch(setAppStatus({status: 'loading'}));
  	const resp = await authAPI.me();
  	if (resp.data.resultCode === ResultCodesEnum.Success) {
  		const { id, email, login } = resp.data.data; //деструктуризируем полученный с сервера объект
  		const profileResp = await profileAPI.setProfile(id) //загружаем данные профайла с сервера по полученному id
  			//добавила асинхронный запрос профиля для получения фото для хэдера
  		dispatch(setAuthProfile( {userId: id, email, login, isAuth: true, photos: profileResp.data.photos} )); //добавляем флаг isAuth и фото поьзователя
		} else {
  		handleServerError(dispatch, resp.data)
  	}
  } catch (error) {
  		handleNetworkError(dispatch, error as { message: string });
  }
  	finally {
  		dispatch(setInitializedSuccess())
			// dispatch(setAppStatus({status: 'success'});
  	}; 
  }
};

//TC для login
export const LoginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatus({status: 'loading'}))
		authAPI.login(email, password, rememberMe)
		.then(resp => {
			if (resp.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAppStatus({status: 'success'}));
        dispatch(getMeTC());
      } else {
        handleServerError(dispatch, resp.data);
      }
		})
		.catch((err) => handleNetworkError(dispatch, err))
	}
}

//thunkcreator для logout
export const LogoutThunkCreator = (): AppThunk<Promise<void>> => {
  return (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    return authAPI.logout()
      .then((resp) => {
        if (resp.data.resultCode === ResultCodesEnum.Success) {
          dispatch(setAppStatus({status: 'success'}));
          dispatch(setAuthProfile({email: null, login: null, userId: null, isAuth: false, photos: null}));
        } else {
          handleServerError(dispatch, resp.data);
        }
      })
      .catch((err) => handleNetworkError(dispatch, err));
  };
};


//* Types
export type authInitialStateType = ReturnType<typeof authSlice.getInitialState>
type ProfileData = {userId: number | null, email: string | null, login: string | null, isAuth: boolean, photos: PhotosType | null}