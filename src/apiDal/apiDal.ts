import { UserType } from './../types/types';
import axios from "axios";
import { ProfileType } from "../types/types";
import { string } from 'yup';

//с помощью встроенного метода create создается объект с базовыми насройками
const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { "API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b" }
})


//*usersAPI
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
		const resp = await axiosInstance.post<ResponseType>( `follow/${userId}`);
		return resp.data;
	},
	async unfollow(userId: number) {
		const resp = await axiosInstance.delete<ResponseType>(`follow/${userId}`);
		return resp.data;
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
		return axiosInstance.get<ResponseType<{ id: number; email: string; login: string } | {}>>("auth/me");
	},
	login(email: string, password: string, rememberMe: boolean = false) {
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

};



//* Types 
type UsersResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type ResponseType<D = {}> = {
  data: D;
  resultCode: number;
  messages: Array<string>;
};

//тип диаогов под вопросом 
// export type DialogMessageFromServerType = {
//     id: string
//     body: string
//     translatedBody: null
//     addedAt: string
//     senderId: number
//     senderName: string
//     recipientId: number
//     recipientName: string
//     viewed: boolean
//     deletedBySender: boolean
//     deletedByRecipient: boolean
//     isSpam: boolean
//     distributionId: null
// };


export type SingleDialogItemType = {
  id: string
  body: string
  translatedBody: null;
  addedAt: string
  senderId: number
  senderName: string
  recipientId: number
  viewed: boolean
};

type getAllDialogsWithUserResponseType = {
	error: string 
	items: SingleDialogItemType[]
	totalCount: number
}

//enum прописываем чтобы не запоминать какой код что означает
export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}