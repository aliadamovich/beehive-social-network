import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes"
import {
	BaseQueryApi,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query/react"
import { setAppError } from "app/appSlice"
import { ResultCodes } from "common/enums/enum"


export const handleError = (
	api: BaseQueryApi,
	result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
	let error = "Some error occurred"

	if (result.error) {
		switch (result.error.status) {
			case "FETCH_ERROR":
			case "PARSING_ERROR":
			case "CUSTOM_ERROR":
				error = result.error.error
				break

			case 403:
				error = "403 Forbidden Error. Check API-KEY"
				break

			case 400:
				error = (result.error.data as { message: string }).message
				break

			default:
				error = JSON.stringify(result.error)
				break
		}
		api.dispatch(setAppError({ error }))
	}

	if ((result.data as { resultCode: ResultCodes }).resultCode === ResultCodes.Error) {
		const messages = (result.data as { messages: string[] }).messages
		error = messages.length ? messages[0] : error
		api.dispatch(setAppError({ error }))
	}
}
