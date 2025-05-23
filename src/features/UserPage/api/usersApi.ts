import { baseApi } from "app/baseApi"
import { ResponseWithItems, StandartResponse } from "common/types/types"
import { DomainUser, getUsersParams, InfiniteSearchType, UserType } from "features/UserPage/api/usersApi.types"

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
			providesTags: ["Users"],
		}),
		getInfiniteScrollUsers: build.infiniteQuery<ResponseWithItems<DomainUser[]>, InfiniteSearchType, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParams) => 
					lastPageParam + 1
			},
			query: ({queryArg, pageParam}) => {
			return {
				url: "users",
				// params: { count: INITIAL_SEARCH_PARAMS.count, ...queryArg, page: pageParam },
				params: { count: 12, page: pageParam },
			}
		},
		transformResponse(res: ResponseWithItems<UserType[]>): ResponseWithItems<DomainUser[]> {
		return { ...res, items: res.items.map((u) => ({ ...u, entityStatus: "idle" })) }
		},
		 extraOptions: {
        refetchOnMountOrArgChange: false,
      },
		providesTags: (result, error) => {
			if (!result) return ["Users"]
			return [
  		 ...result.pages.flatMap(page => 
     	 page.items.map(user => ({ type: "Users" as const, id: user.id }))
				),
			];
		},
	}),

		followUser: build.mutation<StandartResponse, number>({
			query: (userId) => ({
				url: `follow/${userId}`,
				method: "POST",
			}),
			invalidatesTags: (result, error, userId) => [
				{ type: "Users", id: userId },
			]
		}),
		unfollowUser: build.mutation<StandartResponse, number>({
			query: (userId) => ({
				url: `follow/${userId}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, userId) => [
				{ type: "Users", id: userId },
			]
		}),
	}),
})

export const {useGetUsersQuery, useGetInfiniteScrollUsersInfiniteQuery, useLazyGetUsersQuery, useFollowUserMutation, useUnfollowUserMutation} = usersAPI

