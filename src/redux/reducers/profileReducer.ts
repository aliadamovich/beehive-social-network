import { ThunkAction } from "@reduxjs/toolkit";
import { profileAPI } from "../../apiDal/apiDal";
import { PhotosType, PostType, ProfileType } from "../../types/types";
import { AppStateType } from "../redux-store";



let initialState = {
	posts: [
		{
			"userId": 1,
			"id": 1,
			"type": "replied",
			"body": "А кому сейчас легко?"
		},
		{
			"userId": 1,
			"id": 2,
			"type": "posted a new activity comment",
			"body": "Хозяйка не дает кушоц...",
		},
		{
			"userId": 1,
			"id": 3,
			"type": "posted a new comment",
			"body": "Обожрался шерсти...Блевал",
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

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case 'ADD-POST':
			let newPost = {
				"userId": 1,
				"id": 12,
				"type": "posted a new comment",
				"body": state.newPostText,
			} 

			return {
				...state, 
				posts: [newPost, ...state.posts],
				newPostText: ''
			}

		case 'UPDATE-NEW-POST-TEXT':
			return{
				...state,
				newPostText: action.newText
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

type AddPostActionType = {type: 'ADD-POST'}
type UpdatePostActionType = {type: 'UPDATE-NEW-POST-TEXT', newText: string}
type SetProfileActionType = {type: 'SET-USER-PROFILE', profile: ProfileType}
type SetStatusActionType = {type: 'SET-STATUS', status: string}
type SetPhotoActionType = {type: 'SET-PROFILE-PHOTO', photos: PhotosType}

type ActionsType = AddPostActionType | UpdatePostActionType | SetProfileActionType | SetStatusActionType | SetPhotoActionType

export const addPostActionCreator = (): AddPostActionType => ({ type: 'ADD-POST' })
export const updateNewPostTextActionCreator = (text: string): UpdatePostActionType => ({type: 'UPDATE-NEW-POST-TEXT',newText: text})
export const setUserProfileAC = (profile: ProfileType): SetProfileActionType => ({type: 'SET-USER-PROFILE', profile});
const setStatusAC = (status: string): SetStatusActionType => ({ type: 'SET-STATUS', status})
const setPhotoAC = (photos: PhotosType): SetPhotoActionType => ({ type: 'SET-PROFILE-PHOTO', photos})


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUserProfileThunkCreator = (profileId: number): ThunkType => {
  return async (dispatch) => {
    const resp = await profileAPI.setProfile(profileId)
		 dispatch(setUserProfileAC(resp.data));
  };
};

export const getStatusThunkCreator = (profileId: number): ThunkType => {
  return async (dispatch) => {
    const resp = await profileAPI.getStatus(profileId);
    dispatch(setStatusAC(resp.data));
  };
};

export const updateStatusThunkCreator = (status: string): ThunkType => {
	return async (dispatch) => {
		const resp = await profileAPI.updateStatus(status)
			if (resp.data.resultCode === 0) {
				dispatch(setStatusAC(status))
			}
	}
}


export const saveProfilePhotoThunkCreator = (file: any): ThunkType => {
  return async (dispatch) => {
    const resp = await profileAPI.setProfilePhoto(file);
    if (resp.data.resultCode === 0) {
      dispatch(setPhotoAC(resp.data.data.photos));
    }
  };
};

//используем доп getState() чтобы получить доступ к другой части стейта и взять айди польз-ля
export const saveProfileInfoThunkCreator = (formData: ProfileType): ThunkType => {
  return async function (dispatch, getState: () => AppStateType) {
    const userId = getState().auth.userId;
		if (userId ) {
			let resp = await profileAPI.setProfileInfo(formData);
			if (resp.data.resultCode === 0) {
				dispatch(getUserProfileThunkCreator(userId));
			}
		}
  };
};
