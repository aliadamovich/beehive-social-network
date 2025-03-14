import { baseApi } from "app/baseApi"
import { ResultCodes } from "common/enums/enum";
import { StandartResponse } from "common/types/types";
import { LoginData } from "features/LoginPage/api/authApi.types"


export const authAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		me: build.query<StandartResponse<{ id: number; email: string; login: string }>, void>({
			query: () => "auth/me",
		}),
		login: build.mutation<StandartResponse<{ userId: number, token: string } | {}>, LoginData>({
			query: (loginData) => ({
				url: "auth/login",
				method: "POST",
				body: loginData
			}),
			// invalidatesTags: ["Auth"],
		}),
		logout: build.mutation<StandartResponse<{ userId: number } | {}>, void>({
			query: () => ({
				url: "auth/login",
				method: "DELETE",
			}),
			// invalidatesTags: ["Auth"],
		}),
	}),
})

export const {useLoginMutation, useLogoutMutation, useMeQuery} = authAPI

