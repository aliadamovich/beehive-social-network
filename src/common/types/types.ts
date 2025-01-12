
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string
};

export type ContactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}

export type PhotosType = {
	small: string | null
	large: string | null
}

export type UserType = {
	id: number
	name: string
	status: string
	photos: PhotosType
	followed: boolean
}

//*server responses
export type StandartResponse<D = {}> = {
	data: D
	resultCode: number
	messages: Array<string>
}

export type ResponseWithItems<T> = {
	items: T
	totalCount: number
	error: string
}