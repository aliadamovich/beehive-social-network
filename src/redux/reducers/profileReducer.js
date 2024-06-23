import { usersAPI } from "../../apiDal/apiDal";

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
	userProfile: null
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

		default: return state
	}
}

export const addPostActionCreator = () => ({ type: 'ADD-POST' })
export const updateNewPostTextActionCreator = (text) => ({type: 'UPDATE-NEW-POST-TEXT',newText: text})
const setUserProfileAC = (profile) => ({type: 'SET-USER-PROFILE', profile});

export const getUserProfileThunkCreator = (profileId) => {
	return function(dispatch) {
		usersAPI.setProfile(profileId)
			.then(resp => {
				dispatch(setUserProfileAC(resp.data));
			})
	}
}
