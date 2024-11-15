import styled from 'styled-components';
import { Icon } from '../Icon';
import { Field } from 'formik';
import { Input } from 'antd';
import { ChangeEvent, useState } from 'react';

type Props = {
	debounceChange?: (value: string) => void
	searchInputChangeHandler: (value: string) => void
	value: string
}

export const Search = ({ debounceChange, searchInputChangeHandler, value }: Props) => {
	const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

	const onChangeTextCallback = (e: ChangeEvent<HTMLInputElement>) => {
		searchInputChangeHandler(e.currentTarget.value)
		if (debounceChange) {
			clearTimeout(timerId)
			const newTimer = setTimeout(() => {
				debounceChange(e.currentTarget.value);
			}, 2000)
			setTimerId(newTimer)
		}
	}
	return(
		<StyledSearch>
			<Input type="text" value={value} placeholder='Search' onChange={onChangeTextCallback} />
			<StyledIcon>
				<Icon iconId='search' viewBox="0 0 129 129" fill='#FFF' width='15' height='15' />
			</StyledIcon>
		</StyledSearch>
	)
}


const StyledSearch = styled.div`
	padding: 13px 0;
	display: flex;
	align-items: center;
	gap: 10px;

	input {
		border: 1px solid rgb(237, 241, 245);
		border-radius: 20px;
		padding: 6px 10px;
		min-width: 200px;
		font-size: 17px;

		&::placeholder {
			font-weight: 500;
		}
	}
`

const StyledIcon = styled.div`
	width: 30px;
	height: 30px;
	background: linear-gradient(to top left, rgb(189, 139, 237), rgb(129, 29, 222));
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s ease 0s;
	
	&:hover{
		opacity: 0.8;
	}
`