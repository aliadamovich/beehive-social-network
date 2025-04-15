import { profileAPI } from "../../apiDal/apiDal";
import { PhotosType } from "../../common/types/types";
import { AppStateType, AppThunk } from "../redux-store";
import { setAppStatus } from '../../app/appSlice';
import { v1 } from 'uuid';
import { ProfileType } from 'features/ProfilePage/api/profileApi.types';
import { ResultCodes } from "common/enums/enum";


let initialState = {
	posts: [
		{
			id: v1(),
			type: "replied",
			body: "Congrats with your new job, dear!",
		},
		{
			id: v1(),
			type: "posted a new activity comment",
			body: "Life is too short to be sorry...",
		},
		{
			id: v1(),
			type: "posted a new comment",
			body: "Well... this is my first post here",
		},
		{
			id: v1(),
			type: "posted a new comment",
			body: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
		},
	] as Array<PostType>,
	newPostText: "" as string,
	userProfile: null as ProfileType | null,
	status: "",
}


export const _profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case 'ADD-POST':
			let newPost = {
				"id": v1(),
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
export const _getUserProfileThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
  return async (dispatch) => {
		dispatch(setAppStatus({status: 'loading'}));
		profileAPI.setProfile(profileId)
			.then((resp) => {
				dispatch(setUserProfileAC(resp.data));
				return resp.data.userId
			})
			.then((userId) => {
				dispatch(_getStatusThunkCreator(userId))
				dispatch(setAppStatus({status: 'success'}))
			})
         


		
		  //  try {
      //    dispatch(setAppStatus({status: 'loading'}));
      //    const resp = await profileAPI.setProfile(profileId);
      //    dispatch(setUserProfileAC(resp.data));
      //    dispatch(setAppStatus({status: 'success'}));
      //  } catch (error) {
      //    handleNetworkError(dispatch, error as { message: string });
      //  }
  };
};

export const _getStatusThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
  return async (dispatch) => {
 
  //  dispatch(setAppStatus({status: 'loading'}));
   return profileAPI.getStatus(profileId).then((resp)=> {
   dispatch(setStatusAC(resp.data));
  //  dispatch(setAppStatus({status: 'success'}));
	 })

 
    // try {
    //   dispatch(setAppStatus({status: 'loading'}));
    //   const resp = await profileAPI.getStatus(profileId);
    //   dispatch(setStatusAC(resp.data));
    //   dispatch(setAppStatus({status: 'success'}));
    // } catch (error) {
    //   handleNetworkError(dispatch, error as { message: string });
    // }
  };
};

export const _updateStatusThunkCreator = (status: string): AppThunk => {
	return async (dispatch) => {
		const resp = await profileAPI.updateStatus(status)
		if (resp.data.resultCode === ResultCodes.Success) {
			dispatch(setStatusAC(status))
		}
	}
}


export const _updateProfilePhotoThunkCreator = (file: any): AppThunk => {
  return async (dispatch) => {
		try {
			dispatch(setAppStatus({status: 'loading'}));
			const resp = await profileAPI.setProfilePhoto(file);
      if (resp.data.resultCode === ResultCodes.Success) {
        dispatch(setPhotoAC(resp.data.data.photos));
				dispatch(setAppStatus({status: 'success'}));
      } else {
				// handleServerError(dispatch, resp.data)
			}
		} catch (error) {
			// handleNetworkError(dispatch, error as {message: string})
		}
  };
};

//используем доп getState() чтобы получить доступ к другой части стейта и взять айди польз-ля
export const _updateProfileInfoTC = (formData: ProfileType): AppThunk => {
  return async (dispatch, getState: () => AppStateType) => {
		dispatch(setAppStatus({ status: "loading" }))
    const userId = getState().auth.userId;
		if (userId ) {
			try {
				let resp = await profileAPI.setProfileInfo(formData);
        if (resp.data.resultCode === ResultCodes.Success) {
          dispatch(_getUserProfileThunkCreator(userId));
        } else {
          // handleServerError(dispatch, resp.data);
        }
			} catch (error) {
				// handleNetworkError(dispatch, error as { message: string });
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

	type PostType = {
		id: string
		type: string
		body: string
	}