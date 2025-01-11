export type ResponseFromServer<T> = {
	error: string
	items: T
	totalCount: number
}

export type SingleDialogItemType = {
	id: string
	body: string
	translatedBody: null
	addedAt: string
	senderId: number
	senderName: string
	recipientId: number
	viewed: boolean
}

export type StandartResponse<D = {}> = {
	data: D
	resultCode: number
	messages: Array<string>
}