import styled from 'styled-components';
import { Icon } from '../Icon';
import { Field } from 'formik';
import { Input, Spin } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { SearchParamsType } from 'features/UserPage/ui/_Users';
import { selectStatus } from 'app/appSlice';

type Props = {
	debounceChange: (value: string) => void
	// searchInputChangeHandler: (value: string) => void
	// updateSearchParams: (params: Partial<Record<SearchParamsType, string>>) => void
	 initialValue: string
}

export const Search = ({ debounceChange, initialValue }: Props) => {
	const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
	const [searchInProgress, setSearchInProgress] = useState(false);
	const appStatus = useSelector(selectStatus);
	const [searchValue, setSearchValue] = useState(initialValue);
	useEffect(() => { setSearchValue(initialValue) },
	[initialValue])
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		// searchInputChangeHandler(e.currentTarget.value)
		// updateSearchParams({ term: e.currentTarget.value })
		setSearchValue(e.currentTarget.value)
		if (debounceChange) {
			setSearchInProgress(true)
			clearTimeout(timerId)
			const newTimer = setTimeout(async () => {
				debounceChange(e.currentTarget.value);
				// updateSearchParams({ term: e.currentTarget.value })
				setSearchInProgress(false)
			}, 1500)
			setTimerId(newTimer)
		}
	}

	const searchValueHandler = async () => {
		setSearchInProgress(true);
		await debounceChange?.(searchValue);
		setSearchInProgress(false)
	}

	return(
		<StyledSearch>
			{/* {searchInProgress && <Spin indicator={<LoadingOutlined spin />} size="small" />} */}
			<Input type="text" value={searchValue} placeholder='Search' onChange={onChangeHandler} />
			<StyledIconButton onClick={searchValueHandler} disabled={searchInProgress === true || appStatus=== 'loading'}>
				<Icon iconId='search' viewBox="0 0 129 129" fill='#FFF' width='15' height='15' />
			</StyledIconButton>
		</StyledSearch>
	)
}


const StyledSearch = styled.div`
	padding: 13px 10px;
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

const StyledIconButton = styled.button`
	width: 30px;
	height: 30px;
	background: linear-gradient(to top left, rgb(189, 139, 237), rgb(129, 29, 222));
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s ease 0s;
	border: none;
	
	&:hover{
		opacity: 0.8;
	}

	&:disabled {
		opacity: 0.5;
		cursor: auto;
	}
`