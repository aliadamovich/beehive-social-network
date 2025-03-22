import { EntityStatus, PhotosType } from "common/types/types"

export type getUsersParams = {
	count?: number
	term?: string
	page?: number
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
export type InfiniteSearchType = Omit<getUsersParams, 'page' | 'friend' | 'count'>
