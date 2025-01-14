import { PhotosType } from "common/types/types";

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