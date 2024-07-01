import { profileAPI } from "../../apiDal/apiDal";

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
	],
	newPostText: '',
	userProfile: null,
	status: ''
}

export const profileReducer = (state = initialState, action) => {

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
				...state, userProfile: { ...state.profile, photos: action.photos }
			}

		// case 'SET-PROFILE-INFO': 
		// return {
		// 	...state, userProfile: 
		// }
		default: return state
	}
}

export const addPostActionCreator = () => ({ type: 'ADD-POST' })
export const updateNewPostTextActionCreator = (text) => ({type: 'UPDATE-NEW-POST-TEXT',newText: text})
export const setUserProfileAC = (profile) => ({type: 'SET-USER-PROFILE', profile});
const setStatusAC = (status) => ({ type: 'SET-STATUS', status})
const setPhotoAC = (photos) => ({ type: 'SET-PROFILE-PHOTO', photos})
const saveProfileInfoAC = (info) => ({type: 'SET-PROFILE-INFO', info})
export const getUserProfileThunkCreator = (profileId) => {
	return function(dispatch) {
		profileAPI.setProfile(profileId)
			.then(resp => {
				dispatch(setUserProfileAC(resp.data));
			})
	}
}

export const getStatusThunkCreator = (profileId) => {

	return function (dispatch) {
		profileAPI.getStatus(profileId)
			.then(resp => {
				dispatch(setStatusAC(resp.data))
			})
	}
}

export const updateStatusThunkCreator = (status) => {

	return function(dispatch) {
		profileAPI.updateStatus(status)
		.then(resp => {
			if (resp.data.resultCode === 0) {
				dispatch(setStatusAC(status))
			}
		})
	}
}

export const saveProfilePhotoThunkCreator = (file) => {

	return function (dispatch) {
		profileAPI.setProfilePhoto(file)
			.then(resp => {
			
				if (resp.data.resultCode === 0) {
					dispatch(setPhotoAC(resp.data.data.photos))
					
				}
			})
	}
}

//используем доп getState() чтобы получить доступ к другой части стейта и взять айди польз-ля
export const saveProfileInfoThunkCreator = (formData) => {
	
	return async function (dispatch, getState) {
		const userId = getState().auth.autID.id
		console.log(userId);

		let resp = await profileAPI.setProfileInfo(formData);
			
				if (resp.data.resultCode === 0) {
					dispatch(getUserProfileThunkCreator(userId))
				}
	}
}
