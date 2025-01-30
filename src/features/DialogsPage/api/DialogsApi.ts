import { baseApi } from "app/baseApi";
import { AllMessages, SingleDialogItem } from "./DialogsApi.types";
import { ResponseWithItems, StandartResponse } from "common/types/types";

export const dialogsAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllMessages: build.query<AllMessages[], void>({
			query: () => "dialogs",
			providesTags: ["Dialogs"],
		}),
		getMessagesWithUser: build.query<ResponseWithItems<SingleDialogItem[]>, number>({
			query: (userId) => `dialogs/${userId}/messages`,
			providesTags: ["Dialogs"],
		}),
		getMessagesByDate: build.query<SingleDialogItem[], { date: string; userId: number }>({
			query: ({ userId, date }) => `dialogs/${userId}/messages/new?newerThen=${date}`,
			providesTags: ["Dialogs"],
		}),
		sendMessage: build.mutation<StandartResponse<{ message: SingleDialogItem }>, { userId: number; message: string }>({
			query: ({ userId, message }) => ({
				url: `dialogs/${userId}/messages`,
				method: "POST",
				body: { body: message },
			}),
			invalidatesTags: ["Dialogs"],
		}),
		deleteMessage: build.mutation<StandartResponse, string>({
			query: (messageId) => ({
				url: `dialogs/messages/${messageId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Dialogs"],
		}),
		startDialogWithUser: build.mutation<ResponseWithItems<[]>, number>({
			query: (userId) => {
				return {
					url: `dialogs/${userId}`,
					method: "PUT",
					body: { userId },
				}
			},
			invalidatesTags: ["Dialogs"],
		}),
	}),
})

export const 
{ useGetAllMessagesQuery, 
	useLazyGetMessagesByDateQuery, 
	useGetMessagesWithUserQuery, 
	useStartDialogWithUserMutation,
	useSendMessageMutation,
	useDeleteMessageMutation } = dialogsAPI

