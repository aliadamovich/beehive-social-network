import { baseApi } from "app/baseApi";
import { SingleDialogItemType } from "./DialogsApi.types";
import { ResponseWithItems, StandartResponse } from "common/types/types";

export const dialogsAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllMessages: build.query<ResponseWithItems<SingleDialogItemType[]>, number>({
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

export const { useGetAllMessagesQuery, useDeleteMessageMutation, useSendMessageMutation } = dialogsAPI

