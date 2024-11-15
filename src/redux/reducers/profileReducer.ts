import { ResultCodesEnum } from './../../apiDal/apiDal';
import { profileAPI } from "../../apiDal/apiDal";
import { PhotosType, PostType, ProfileType } from "../../types/types";
import { AppStateType, AppThunk } from "../redux-store";
import { setAppStatusAC } from "./appReducer";
import { handleNetworkError, handleServerError } from '../../utils/errorHandlers';


let initialState = {
	posts: [
		{
			"userId": 1,
			"id": 1,
			"type": "replied",
			"body": "Congrats with your new job, dear!"
		},
		{
			"userId": 1,
			"id": 2,
			"type": "posted a new activity comment",
			"body": "Life is too short to be sorry..."
		},
		{
			"userId": 1,
			"id": 3,
			"type": "posted a new comment",
			"body": "Well... this is my first post here",
		},
		{
			"userId": 1,
			"id": 4,
			"type": "posted a new comment",
			"body": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
		},
	] as Array<PostType>,
	newPostText: '' as string,
	userProfile: null as ProfileType | null,
	status: '' 
}


export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case 'ADD-POST':
			let newPost = {
				"userId": 1,
				"id": 12,
				"type": "posted a new comment",
				"body": action.post
			} 
			return {
				...state, 
				posts: [newPost, ...state.posts],
				newPostText: ''
			}

		
		case 'SET-USER-PROFILE':
			return {
				...state, userProfile: action.profile
			}

			case 'SET-STATUS':
			return {
				...state, status: action.status
			}


		case 'SET-PROFILE-PHOTO':
			return {
				...state, userProfile: { ...state.userProfile, photos: action.photos } as ProfileType
			}

		default: return state
	}
}

//* Action Creators
export const addPostAC = (post: string) => ({ type: "ADD-POST", post } as const);
export const setUserProfileAC = (profile: ProfileType) => ({type: 'SET-USER-PROFILE', profile} as const);
const setStatusAC = (status: string) => ({ type: 'SET-STATUS', status} as const)
const setPhotoAC = (photos: PhotosType) => ({ type: 'SET-PROFILE-PHOTO', photos} as const)

//* Thunks
export const getUserProfileThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
  return async (dispatch) => {
		dispatch(setAppStatusAC("loading"));
		profileAPI.setProfile(profileId)
			.then((resp) => {
				dispatch(setUserProfileAC(resp.data));
				return resp.data.userId
			})
			.then((userId) => {
				dispatch(getStatusThunkCreator(userId))
				dispatch(setAppStatusAC("success"))
			})
         


		
		  //  try {
      //    dispatch(setAppStatusAC("loading"));
      //    const resp = await profileAPI.setProfile(profileId);
      //    dispatch(setUserProfileAC(resp.data));
      //    dispatch(setAppStatusAC("success"));
      //  } catch (error) {
      //    handleNetworkError(dispatch, error as { message: string });
      //  }
  };
};

export const getStatusThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
  return async (dispatch) => {
 
  //  dispatch(setAppStatusAC("loading"));
   return profileAPI.getStatus(profileId).then((resp)=> {
   dispatch(setStatusAC(resp.data));
  //  dispatch(setAppStatusAC("success"));
	 })

 
    // try {
    //   dispatch(setAppStatusAC("loading"));
    //   const resp = await profileAPI.getStatus(profileId);
    //   dispatch(setStatusAC(resp.data));
    //   dispatch(setAppStatusAC("success"));
    // } catch (error) {
    //   handleNetworkError(dispatch, error as { message: string });
    // }
  };
};

export const updateStatusThunkCreator = (status: string): AppThunk => {
	return async (dispatch) => {
		const resp = await profileAPI.updateStatus(status)
		if (resp.data.resultCode === ResultCodesEnum.Success) {
			dispatch(setStatusAC(status))
		}
	}
}


export const saveProfilePhotoThunkCreator = (file: any): AppThunk => {
  return async (dispatch) => {
		try {
			dispatch(setAppStatusAC("loading"));
			const resp = await profileAPI.setProfilePhoto(file);
      if (resp.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setPhotoAC(resp.data.data.photos));
				dispatch(setAppStatusAC("success"));
      } else {
				handleServerError(dispatch, resp.data)
			}
		} catch (error) {
			handleNetworkError(dispatch, error as {message: string})
		}
  };
};

//используем доп getState() чтобы получить доступ к другой части стейта и взять айди польз-ля
export const saveProfileInfoTC = (formData: ProfileType): AppThunk => {
  return async function (dispatch, getState: () => AppStateType) {
		dispatch(setAppStatusAC('loading'))
    const userId = getState().auth.userId;
		if (userId ) {
			try {
				let resp = await profileAPI.setProfileInfo(formData);
        if (resp.data.resultCode === ResultCodesEnum.Success) {
          dispatch(getUserProfileThunkCreator(userId));
        } else {
          handleServerError(dispatch, resp.data);
        }
			} catch (error) {
				handleNetworkError(dispatch, error as { message: string });
			}
		}
  };
};



//* Types
type InitialStateType = typeof initialState;

type ActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setPhotoAC>;