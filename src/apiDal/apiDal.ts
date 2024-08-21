import { UserType } from './../types/types';
import axios from "axios";
import { ProfileType } from "../types/types";

//с помощью встроенного метода create создается объект с базовыми насройками
const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { "API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b" }
})

type UsersResponseType = {
  items: Array< UserType >
	totalCount: number
	error: string | null
};

//доп объекты с методами
export const usersAPI = {
	async getUsers (currentPage: number, usersOnPage: number, isFriend?: boolean ) {
		const friendQuery = isFriend ? `&friend=${isFriend}` : '';
		const resp = await axiosInstance.get<UsersResponseType>(`users?page=${currentPage}&count=${usersOnPage}${friendQuery}`);
		return resp.data;
	},
	async checkFollow(userId: number) {
		const resp = await axiosInstance.get<boolean>(`follow/${userId}`);
		return resp.data;
	},
	async follow(userId: number) {
		const resp = await axiosInstance.post<StatusResponseType>( `follow/${userId}`);
		return resp.data;
	},
	async unfollow(userId: number) {
		const resp = await axiosInstance.delete<StatusResponseType>(`follow/${userId}`);
		return resp.data;
	},
}

type StatusResponseType = {
	resultCode: ResultCodesEnum
	messages: Array<string | null>
	data: {}
}

export const profileAPI = {
  setProfile(profileId: number) {
    return axiosInstance.get<ProfileType>(`profile/${profileId}`);
  },

  getStatus(profileId: number) {
    return axiosInstance.get<string>(`profile/status/${profileId}`);
  },

  updateStatus(status: string) {
    return axiosInstance.put<StatusResponseType>(`profile/status`, {
      status: status,
    });
  },

  setProfilePhoto(photo: any) {
    const formData = new FormData();
    formData.append("image", photo);
    return axiosInstance.put(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setProfileInfo(form: ProfileType) {
    return axiosInstance.put(`profile/`, form);
  },
};

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum
  messages: Array<string>;
};

type LoginLogoutResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>;
  data: { userId: number } | {};
};

//enum прописываем чтобы не запоминать какой код что означает
export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}

export const authAPI = {
	me() {
		return axiosInstance.get<MeResponseType>("auth/me");
	},
	login(email: string, password: string, rememberMe: boolean = false) {
		return axiosInstance.post<LoginLogoutResponseType>("auth/login", {
      email,
      password,
      rememberMe,
    });
	},
	logout() {
		return axiosInstance.delete<LoginLogoutResponseType>("auth/login");
	}
}

export const dialogsAPI = {
	async sendMessageToServer(userId: number, message: string) {
		return axiosInstance.post(`dialogs/${userId}/messages`, { message });
		// return resp.data;
	},

	async getAllMessagesFromServer() {
		return await axiosInstance.get('dialogs');
		// return resp.data;
	},

	async startDialog(userId: number) {
		return axiosInstance.put(`dialogs/${userId}`);
	}
}

