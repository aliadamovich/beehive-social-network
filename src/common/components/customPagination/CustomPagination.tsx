import { Pagination, PaginationProps } from "antd"
import { INITIAL_SEARCH_PARAMS } from "features/UserPage/api/usersApi"

type Props = PaginationProps & {
	
}
export const CustomPagination = (props: Props) => {
	const {defaultCurrent, total, style, onChange, align, size} = props

	return (
		<Pagination
			defaultCurrent={INITIAL_SEARCH_PARAMS.page || defaultCurrent}
			total={total}
			onChange={onChange}
			showSizeChanger={false}
			style={style}
			align= {align || 'end'}
			size={size}
		/>
	)
}