import { MainButton } from 'common/components/MainButton'
import { NavLink, useOutletContext } from 'react-router-dom'
import { PATH } from 'routes/routes'
import styled from 'styled-components'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { myTheme } from 'styles/Theme'
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

type Props = {
	datePickerChangeHandler: (date: string) => void
}

export const DialogsHeader = ({ datePickerChangeHandler }: Props) => {
	
	const { handleBackClick } = useOutletContext<any>();

	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		const newDate = dayjs(dateString as string).toISOString();
		datePickerChangeHandler(newDate)
	}
	return (
		<StyledButtonContainer >
			<NavLink to={PATH.DIALOGS}>
				<MainButton loading={false} icon={<ArrowLeftOutlined />}
					onClick={handleBackClick} />
			</NavLink>
			<StyledCalendar>
				<DatePicker onChange={onChange} placeholder='Search by date'/>
			</StyledCalendar>
		</StyledButtonContainer>
	)
}


const StyledButtonContainer = styled.div`
	/* display: none; */
	a{
		display: inline-block;
	}

	/* @media ${myTheme.media[950]} { */
		position: sticky;
		width: 100%;
		z-index: 1000;
		top: 0%;
		left: 0%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	/* } */
`

const StyledCalendar = styled.div`
	
`