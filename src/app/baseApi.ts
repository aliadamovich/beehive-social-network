import { ApiProvider, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "common/utils/handleErrors"

export const baseApi = createApi({
	reducerPath: "socialNetworkApi",
	baseQuery: async (args, api, extraOptions) => {
		const result = await fetchBaseQuery({
			baseUrl: process.env.REACT_APP_BASE_URL,
			credentials: "include",
			prepareHeaders: (headers) => {
				headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
				headers.set("Authorization", `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`)
			},
		})(args, api, extraOptions)
	
			handleError(api, result)

		return result
	},
	endpoints: () => ({}),
	tagTypes: ["Users", "Profile", "UserStatus", "Dialogs"],
	// refetchOnFocus: true,
	refetchOnReconnect: true,
	// keepUnusedDataFor: 5,
})
