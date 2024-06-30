import { authAPI } from "../../apiDal/apiDal";
import { getUserProfileThunkCreator } from "./profileReducer";

let initialState = {
	initialized: false,
	autID: {id: null, login: null, email: null},
	isAuth: false
}

export const authReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'INITIALIZE-SUCCESS':
			return {
				...state,
				initialized: true
			}

		case 'SET-AUTH-PROFILE':
			return {
				...state,
				autID: action.userAuth,
				isAuth: true
			}

		default: return state
	}
}

const setInitializedSuccessAC = () => ({ type: 'INITIALIZE-SUCCESS' })
const setAuthProfileIdAC = (userAuth) => ({ type: 'SET-AUTH-PROFILE', userAuth })

export const initializeAppThunkCreator = () => {
	return function (dispatch) {
		let promise = dispatch(getAuthUserDataThunkCreator());
		promise.then(() => {
			dispatch(setInitializedSuccessAC());
		})
		
	}
}


export const getAuthUserDataThunkCreator = () => {
	return async function(dispatch) {
		const resp = await authAPI.me();
		if (resp.data.resultCode === 0) {
			dispatch(setAuthProfileIdAC(resp.data.data));
			
			//я сделала этот запрос для отображения фото в хэдере но не сработало
			// dispatch(getUserProfileThunkCreator(resp.data.data.id));

		}
	}
}