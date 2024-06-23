import axios from "axios";

//с помощью встроенного метода create создается объект с базовыми насройками
const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { "API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b" }
})


//доп объекты с методами
export const usersAPI = {
	getUsers (currentPage, usersOnPage) {
		return axiosInstance.get(`users?page=${currentPage}&count=${usersOnPage}`)
			.then(resp => resp.data)
	},
	checkFollow(userId) {
		return axiosInstance.get(`follow/${userId}`)
			.then(resp => resp.data)
	},
	follow(userId) {
		return axiosInstance.post(`follow/${userId}`)
			.then(resp => resp.data)
	},
	unfollow(userId) {
		return axiosInstance.delete(`follow/${userId}`)
			.then(resp => resp.data)
	},
	setProfile(profileId) {
		return axiosInstance.get(`profile/${profileId}`)
	}
	
}

export const authAPI = {
	me() {
		return axiosInstance.get('auth/me')
	}
}

