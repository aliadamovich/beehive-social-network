import { SingleDialogItem } from "features/DialogsPage/api/DialogsApi.types"
import { getDateFromISO } from "features/DialogsPage/lib/getDateFunction"

export const groupMessagesByDate = (messages: SingleDialogItem[]) => {
	return messages?.reduce((acc: Record<string, SingleDialogItem[]>, message: SingleDialogItem) => {
		const date = getDateFromISO(message.addedAt)
		if (!acc[date]) {
			acc[date] = []
		}
		acc[date].push(message)
		return acc
	}, {})
}