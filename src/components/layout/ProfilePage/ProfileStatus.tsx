import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { myTheme } from '../../../styles/Theme'
import { CiEdit } from "react-icons/ci";
import { MdArrowRightAlt } from "react-icons/md";
import { Input } from 'antd';
import { EditOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import { MainButton } from '../../common/MainButton';

type ProfileStatusPropsType = {
	status: string
	isOwner: boolean
	updateStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusPropsType) => {
	// debugger
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)
	const { Search } = Input;

	//исп-ем хук чтобы он подгрузил статус когда в пропсах он придет (указываем зависимость - )
	useEffect(() => { setStatus(props.status) }, [props.status])

	const changeEditMode = () => {
		if(props.isOwner) setEditMode(!editMode)
	}
	
	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	const onButtonClickHandler = () => {
		props.updateStatus(status)
		changeEditMode()
	}

	return (
		<StatusContainer>
			{ editMode ?
				<StyledInput
					variant='filled' value={status} onChange={onInputChange} 
					onBlur={onButtonClickHandler} 
					autoFocus={true} 
					showCount maxLength={30}
				/>
					
				: 
				<StatusWrapper>
					{status 
					?	<>
						<Status onDoubleClick={changeEditMode}>{status}</Status>
							{props.isOwner && 
								<MainButton icon={<EditOutlined />} onClick={onButtonClickHandler} loading={false}/>
							}
						</>
					: <Status>No status...</Status> }
						
				 </StatusWrapper>
			}
		</StatusContainer>
	)
}

const StatusContainer = styled.div`
	position: absolute;
	top: 62%;
	right: -250px;
	width: 250px;
	transform: translateY(-50%);

	@media ${myTheme.media[950]} {
		right: 170px;
	}
`

const StyledInput = styled(Input)`
	color: ${myTheme.colors.boldFontColor};
 height: 35px;
outline: none
`

const StatusWrapper = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;

	button {
		background-color: ${myTheme.colors.backgroundLayout};
		svg{
			color: ${myTheme.colors.mainFontColor};
		}
	}
`
const Status = styled.div`
	display: inline-block;
	padding: 8px 10px;
	background-color: ${myTheme.colors.backgroundLayout};
	border-radius: 6px;
	color: ${myTheme.colors.boldFontColor};
`