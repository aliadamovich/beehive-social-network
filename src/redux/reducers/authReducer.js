import { authAPI } from "../../apiDal/apiDal";

let initialState = {

	autID: {id: null, login: null, email: null},
	isAuth: false
}

export const authReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'SET-AUTH-PROFILE':

			return {
				...state,
				autID: action.userAuth,
				isAuth: true
			}

		default: return state

	}
}

const setAuthProfileIdAC = (userAuth) => ({ type: 'SET-AUTH-PROFILE', userAuth })

export const getAuthUserDataThunkCreator = () => {
	return function(dispatch) {
		authAPI.me()
			.then(resp => {
				if (resp.data.resultCode === 0) {
					dispatch(setAuthProfileIdAC(resp.data.data))
				}
			})
	}
}