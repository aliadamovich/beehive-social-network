import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../../styles/Theme'
import { CiEdit } from "react-icons/ci";
import { MdArrowRightAlt } from "react-icons/md";
import { Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
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
			{ editMode 
				? <FieldWrapper>
					{/* <StatusButton onClick={onButtonClickHandler}><MdArrowRightAlt /></StatusButton> */}
					<Input style={{ color: "#4f515b", width: '350px', height: '35px', outline: 'none'}}
					// addonAfter={<MdArrowRightAlt />} 
					variant='filled' value={status} onChange={onInputChange} 
					// onBlur={onButtonClickHandler} 
					autoFocus={true} 
					showCount maxLength={30} />
					</FieldWrapper>
				: <StatusWrapper>
					{status 
					?	<>
						<Status onDoubleClick={changeEditMode}>{status}</Status>
							{props.isOwner && <CiEdit onClick={changeEditMode} />}
						</>
					: <Status>No status...</Status> }
						
				 </StatusWrapper>
			}
		</StatusContainer>
	)
}

const StatusContainer = styled.div`
	/* color: #FFF; */
	position: absolute;
	top: 60%;
	right: -150%;
	transform: translateY(-50%);
	
	svg {
		cursor: pointer;
		transition: all 0.3s ease 0s;
		width: 20px;
		height: 20px;
		&:hover{
			scale: 1.2;
		}
	}
`
const FieldWrapper = styled.div`
	position: relative;
	display: inline-flex;
	flex-direction: row-reverse;
`
const Field = styled.input`
	padding: 5px 0 5px 10px;
	border: none;
	width: 350px;
	height: 35px;
	font-size: 16px;
	color: currentColor;
	outline: none;

	background-color: #edf1f5c2;
	border-radius: 6px;
	&::placeholder {
		font-size: 14px;
		color: ${theme.colors.borderColor};
	}
`

const StatusButton = styled.button`
	padding: 0 10px;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	position: relative;
	right: 40px;
	z-index: 2;
	color: currentColor;
	transition: all 0.3s ease 0s;
	outline: none;
	border: none;
	
	&:hover{
		background-color: #ffffff4f;
		
		svg {
			scale: 1.2;
		}
	}
`

const StatusWrapper = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;
	width: 392px;

`
const Status = styled.div`
	/* font-weight: 600; */
	display: inline-block;
	padding: 6px 10px;
	font-size: 16px;
	background-color: #edf1f5b4;
	border-radius: 6px;
`