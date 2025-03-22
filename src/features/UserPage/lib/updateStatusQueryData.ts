import { AppDispatch } from "app/store"
import { EntityStatus } from "common/types/types"
import { usersAPI } from "features/UserPage/api/usersApi"
import { getUsersParams } from "features/UserPage/api/usersApi.types"

type Props = {
	dispatch: AppDispatch
	params: getUsersParams
	status: EntityStatus
	userId: number
}
export function updateStatusQueryData({dispatch, params, userId, status}: Props) {
	dispatch(usersAPI.util.updateQueryData('getUsers', params, (state) => {
		let users = state.items
		let index = users.findIndex((user) => user.id === userId)
		users[index].entityStatus = status
	} ))
}

export function updateStatusInfiniteQueryData({dispatch, params, userId, status}: Props) {
	dispatch(usersAPI.util.updateQueryData('getInfiniteScrollUsers', params, (state) => {
		let users = state.pages.flatMap((page) => page.items) ?? [];
		let index = users.findIndex((user) => user.id === userId)
		users[index].entityStatus = status
	} ))
}