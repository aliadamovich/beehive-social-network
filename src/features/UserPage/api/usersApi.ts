import { baseApi } from "app/baseApi"
import { ResponseWithItems, StandartResponse } from "common/types/types"
import { DomainUser, getUsersParams, UserType } from "features/UserPage/api/usersApi.types"

export const INITIAL_SEARCH_PARAMS = {
	count: 12,
	page: 1,
}
export const usersAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<ResponseWithItems<DomainUser[]>, getUsersParams>({
			query: (params) => {
				return {
					url: "users",
					params: { ...INITIAL_SEARCH_PARAMS, ...params },
				}
			},
			transformResponse(res: ResponseWithItems<UserType[]>): ResponseWithItems<DomainUser[]> {
				return { ...res, items: res.items.map((u) => ({ ...u, entityStatus: "idle" })) }
			},
			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				// return `${endpointName}-${JSON.stringify(queryArgs)}`
				return endpointName
			},
			merge: (currentCache: ResponseWithItems<DomainUser[]>, newItems: ResponseWithItems<DomainUser[]>, { arg }) => {
				const isNewSearch = arg.page === 1
				// debugger
				if (isNewSearch) {
					// debugger
					currentCache.items = newItems.items
				} else {
					currentCache.items.push(...newItems.items)
				}
			},
			// Refetch when the page arg changes
			forceRefetch({ currentArg, previousArg }) {
				return JSON.stringify(currentArg) !== JSON.stringify(previousArg)
			},
			providesTags: ["Users"],
		}),
		checkFollow: build.query<boolean, number>({
			query: (userId) => `follow/${userId}`,
			providesTags: ["Users"],
		}),
		followUser: build.mutation<StandartResponse, number>({
			query: (userId) => ({
				url: `follow/${userId}`,
				method: "POST",
			}),
			invalidatesTags: ["Users"],
		}),
		unfollowUser: build.mutation<StandartResponse, number>({
			query: (userId) => ({
				url: `follow/${userId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
	}),
})

export const {useGetUsersQuery, useFollowUserMutation, useUnfollowUserMutation, useLazyCheckFollowQuery} = usersAPI

