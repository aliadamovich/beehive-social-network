import { EntityStatus, PhotosType } from "common/types/types"

export type getUsersParams = {
	count?: number
	page?: number
	term?: string
	friend?: boolean
}

export type UserType = {
	id: number
	name: string
	status: string
	photos: PhotosType
	followed: boolean
}

export type DomainUser = UserType & {
	entityStatus: EntityStatus
}

export type RequestParams = Required<getUsersParams>
