import { UserType } from '../common/types/types';
import axios from "axios";
import { ProfileType } from "../common/types/types";
import { RequestParams } from 'redux-logic/reducers/usersReducer';

//с помощью встроенного метода create создается объект с базовыми насройками
const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
	headers: {
		"API-KEY": process.env.REACT_APP_API_KEY,
		// Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
	},
})



export const usersAPI = {
	async getUsers(params: RequestParams) {
		return axiosInstance.get<UsersResponseType>("users", { params })
	},

	async checkFollow(userId: number) {
		const resp = await axiosInstance.get<boolean>(`follow/${userId}`)
		return resp.data
	},
	async follow(userId: number) {
		const resp = await axiosInstance.post<ResponseType>(`follow/${userId}`)
		return resp.data
	},
	async unfollow(userId: number) {
		const resp = await axiosInstance.delete<ResponseType>(`follow/${userId}`)
		return resp.data
	},
}

//*profileAPI
export const profileAPI = {
  setProfile(profileId: number) {
    return axiosInstance.get<ProfileType>(`profile/${profileId}`);
  },

  getStatus(profileId: number) {
    return axiosInstance.get<string>(`profile/status/${profileId}`);
  },

  updateStatus(status: string) {
    return axiosInstance.put<ResponseType>(`profile/status`, {
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


//*authAPI
export const authAPI = {
	me() {
		return axiosInstance.get<ResponseType<{ id: number; email: string; login: string } >>("auth/me");
	},
	login(email: string, password: string, rememberMe: boolean) {
		return axiosInstance.post<ResponseType<{ userId: number } | {}>>("auth/login", {
      email,
      password,
      rememberMe,
    });
	},
	logout() {
		return axiosInstance.delete<ResponseType<{ userId: number } | {}>>("auth/login");
	}
}

//*dialogsAPI
export const dialogsAPI = {
  async getAllMessagesFromServer(userId: number) {
    return await axiosInstance.get<getAllDialogsWithUserResponseType>(
      `dialogs/${userId}/messages`
    );
  },

  async sendMessageToServer(userId: number, message: string) {
    return axiosInstance.post<ResponseType<{ message: SingleDialogItemType }>>(
      `dialogs/${userId}/messages`, { body: message }
    );
  },

	async deleteMessageFromServer(messageId: string) {
		return axiosInstance.delete(`dialogs/messages/${messageId}`)
	}
};


//* Types 


type UsersResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

type getAllDialogsWithUserResponseType = {
	items: SingleDialogItemType[]
	totalCount: number
	error: string
}

type ResponseType<D = {}> = {
  data: D;
  resultCode: number;
  messages: Array<string>;
};

type SingleDialogItemType = {
  id: string
  body: string
  translatedBody: null;
  addedAt: string
  senderId: number
  senderName: string
  recipientId: number
  viewed: boolean
};





//enum прописываем чтобы не запоминать какой код что означает
export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}
