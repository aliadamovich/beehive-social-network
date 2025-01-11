import { baseApi } from "../redux/app/baseApi";
import { ResponseFromServer, SingleDialogItemType, StandartResponse } from "./DialogsApi.types";

export const dialogsAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllMessages: build.query<ResponseFromServer<SingleDialogItemType[]>, number>({
			query: (userId) => `dialogs/${userId}/messages`,
		}),
		sendMessage: build.mutation<StandartResponse<{ message: SingleDialogItemType }>, { userId: number, message: string } > ({
			query: ({userId, message}) => ({
				url: `dialogs/${userId}/messages`,
				method: "POST",
				body: { message }
			}),
		}),
		deleteMessage: build.mutation<StandartResponse, string> ({
			query: (messageId) => ({
				url: `dialogs/messages/${messageId}`,
				method: 'DELETE'
			})
		})
	}),
})

export const {useDeleteMessageMutation, useGetAllMessagesQuery, useSendMessageMutation} = dialogsAPI

