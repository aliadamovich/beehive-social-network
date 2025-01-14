import { PhotosType } from "common/types/types"

export type SingleDialogItem = {
	id: string
	body: string
	translatedBody: null
	addedAt: string
	senderId: number
	senderName: string
	recipientId: number
	viewed: boolean
}

export type AllMessages = {
	id: number
	userName: string
	hasNewMessages: boolean
	lastDialogActivityDate: string
	lastUserActivityDate: string
	newMessagesCount: number
	photos: PhotosType
}