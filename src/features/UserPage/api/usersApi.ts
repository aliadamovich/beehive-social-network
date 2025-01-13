import { baseApi } from "app/baseApi"
import { ResponseWithItems, StandartResponse } from "common/types/types"
import { getUsersParams, UserType } from "features/UserPage/api/usersApi.types"

export const INITIAL_SEARCH_PARAMS = {
	count: 12,
	page: 1,
}
export const usersAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<ResponseWithItems<UserType[]>, getUsersParams>({
			query: (params) => ({
				url: "users",
				params: { ...INITIAL_SEARCH_PARAMS, ...params },
			}),
		}),
		followUser: build.mutation<StandartResponse, number>({
			query: (userId) => ({
				url: `follow/${userId}`,
				method: "POST"
			}),
		}),
		// sendMessage: build.mutation<
		// 	StandartResponse<{ message: SingleDialogItemType }>,
		// 	{ userId: number; message: string }
		// >({
		// 	query: ({ userId, message }) => ({
		// 		url: `dialogs/${userId}/messages`,
		// 		method: "POST",
		// 		body: { message },
		// 	}),
		// }),
		// deleteMessage: build.mutation<StandartResponse, string>({
		// 	query: (messageId) => ({
		// 		url: `dialogs/messages/${messageId}`,
		// 		method: "DELETE",
		// 	}),
		// }),
	}),
})

export const {useGetUsersQuery} = usersAPI

