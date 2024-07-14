import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/Theme'
import { CiEdit } from "react-icons/ci";
import { MdArrowRightAlt } from "react-icons/md";

export const ProfileStatus = (props) => {
	// debugger
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)

	//исп-ем хук чтобы он подгрузил статус когда в пропсах он придет (указываем зависимость - )
	useEffect(() => { setStatus(props.status) }, [props.status])

	const changeEditMode = () => {
		
		if(props.isOwner) setEditMode(!editMode)
	}
	
	const onInputChange = (e) => {
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
					<StatusButton onClick={onButtonClickHandler}><MdArrowRightAlt /></StatusButton>
					<Field type='text' value={status} onChange={onInputChange} onBlur={onButtonClickHandler} autoFocus={true} maxLength={30}/>
					</FieldWrapper>
				: <StatusWrapper>
					<Status onDoubleClick={changeEditMode}>{status}</Status>
					{props.isOwner && <CiEdit onClick={changeEditMode} />}
				 </StatusWrapper>
			}
		</StatusContainer>
	)
}

const StatusContainer = styled.div`
	color: #FFF;
	position: absolute;
	top: 50%;
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
	background-color: #e7e7e72e;
	border-radius: 8px;
	padding: 5px 0 5px 10px;
	border: none;
	width: 350px;
	height: 35px;
	font-size: 16px;
	color: #fff;
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
	border: 1px solid #fff;
	position: relative;
	right: 42px;
	z-index: 2;
	color: #fff;
	transition: all 0.3s ease 0s;
	
	&:hover{
		background-color: #ffffff4f;
		
		svg {
			fill: #fff;
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
	
	display: inline-block;
	padding: 4px 10px;
	font-size: 16px;
	background-color: #e7e7e72a;
	border-radius: 8px;
`