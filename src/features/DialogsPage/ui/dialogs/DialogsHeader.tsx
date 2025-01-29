import { MainButton } from 'common/components/MainButton'
import { NavLink, useOutletContext } from 'react-router-dom'
import { PATH } from 'routes/routes'
import styled from 'styled-components'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { myTheme } from 'styles/Theme'
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type Props = {
	dateChangeHandler: (date: string | null) => void
	isDateFilterActive: boolean
}

export const DialogsHeader = ({ dateChangeHandler, isDateFilterActive }: Props) => {
	const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
	const { handleBackClick } = useOutletContext<any>();
	
	useEffect(() => {
		if (!isDateFilterActive) {
			setSelectedDate(null);
		}
	}, [isDateFilterActive]);

	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		// debugger
		setSelectedDate(date)
		// const newDate = dayjs(dateString as string).toISOString();
		dateChangeHandler(date ? dayjs(dateString as string).toISOString() : null);
		// if(date === null) {
		// 	setSelectedDate(null)
		// }
	}

	return (
		<StyledButtonContainer>
			<NavLink to={PATH.DIALOGS}>
				<MainButton loading={false} icon={<ArrowLeftOutlined />} onClick={handleBackClick} />
			</NavLink>
			<StyledCalendar>
				<DatePicker onChange={onChange} placeholder='Search by date' value={selectedDate} allowClear/>
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