import dayjs from "dayjs"

export const getDateFromISO = (date: string): string => {
	return dayjs(date).format("DD MMMM YYYY")
}
