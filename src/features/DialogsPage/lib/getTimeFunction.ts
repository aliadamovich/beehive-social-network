import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export const getTimeFromIso = (date: string): string => {
	let formattedMinute = dayjs.utc(date).minute()
	if (formattedMinute < 10) {
		return `${dayjs.utc(date).hour()}:0${formattedMinute}`
	}
	return `${dayjs.utc(date).hour()}:${formattedMinute}`
}