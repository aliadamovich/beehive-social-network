import { createSlice } from '@reduxjs/toolkit';
import { profileAPI, ResultCodesEnum } from 'apiDal/apiDal';
import { setAppStatus } from 'app/appSlice';
import { AppStateType, AppThunk } from 'app/store';
import { PhotosType, ProfileType } from 'common/types/types';
import { handleNetworkError, handleServerError } from 'common/utils/errorHandlers';
import {v1} from 'uuid'

const mockPosts = [
	{
		"id": v1(),
		"type": "replied",
		"body": "Congrats with your new job, dear!"
	},
	{
		"id": v1(),
		"type": "posted a new activity comment",
		"body": "Life is too short to be sorry..."
	},
	{
		"id": v1(),
		"type": "posted a new comment",
		"body": "Well... this is my first post here",
	},
	{
		"id": v1(),
		"type": "posted a new comment",
		"body": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
	},
]


export const profileSlice = createSlice({
	name: "profile",
	initialState: {
		userProfile: null as ProfileType | null,
		userStatus: "",
		posts: mockPosts as Array<PostType>,
	},
	reducers: (create) => ({
		addPost: create.reducer<{ post: string }>((state, action) => {
			const newPost = {
				id: v1(),
				type: "posted a new comment",
				body: action.payload.post,
			}
			state.posts.unshift(newPost)
		}),
		setUserProfile: create.reducer<{ profile: ProfileType }>((state, action) => {
			state.userProfile = action.payload.profile
		}),
		setStatus: create.reducer<{ status: string }>((state, action) => {
			state.userStatus = action.payload.status
		}),
		setProfilePhoto: create.reducer<{ photos: PhotosType }>((state, action) => {
			if (state.userProfile) state.userProfile.photos = action.payload.photos
		}),
	}),

	selectors: {
		selectPosts: (state) => state.posts,
		selectProfileInfo: (state) => state.userProfile,
		selectUserStatus: (state) => state.userStatus,
	},
})
export const profileReducer = profileSlice.reducer;
export const {addPost, setProfilePhoto, setStatus, setUserProfile} = profileSlice.actions
export const { selectPosts, selectUserStatus, selectProfileInfo} = profileSlice.selectors

//* Thunks
export const getUserProfileThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
  return async (dispatch) => {
		dispatch(setAppStatus({status: 'loading'}));
		profileAPI.setProfile(profileId)
			.then((resp) => {
				dispatch(setUserProfile({profile: resp.data}));
				return resp.data.userId
			})
			.then((userId) => {
				dispatch(getStatusThunkCreator(userId))
				dispatch(setAppStatus({status: 'success'}))
			})
  };
};

export const getStatusThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
  return async (dispatch) => {
 
  //  dispatch(setAppStatus({status: 'loading'}));
   return profileAPI.getStatus(profileId).then((resp)=> {
   dispatch(setStatus({status: resp.data}));
  //  dispatch(setAppStatus({status: 'success'}));
	 })

  };
};

export const updateStatusThunkCreator = (status: string): AppThunk => {
	return async (dispatch) => {
		const resp = await profileAPI.updateStatus(status)
		if (resp.data.resultCode === ResultCodesEnum.Success) {
			dispatch(setStatus({status}))
		}
	}
}


export const updateProfilePhotoThunkCreator = (file: any): AppThunk => {
  return async (dispatch) => {
		try {
			dispatch(setAppStatus({status: 'loading'}));
			const resp = await profileAPI.setProfilePhoto(file);
      if (resp.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setProfilePhoto({photos: resp.data.data.photos}));
				dispatch(setAppStatus({status: 'success'}));
      } else {
				handleServerError(dispatch, resp.data)
			}
		} catch (error) {
			handleNetworkError(dispatch, error as {message: string})
		}
  };
};

//используем доп getState() чтобы получить доступ к другой части стейта и взять айди польз-ля
export const updateProfileInfoTC = (formData: ProfileType): AppThunk => {
  return async (dispatch, getState: () => AppStateType) => {
		dispatch(setAppStatus({ status: "loading" }))
    const userId = getState().auth.profileData.userId;
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

type PostType = {
	id: string
	type: string
	body: string
}