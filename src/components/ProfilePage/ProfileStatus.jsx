import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/Theme'
import { CiEdit } from "react-icons/ci";
import { FlexWrapper } from '../common/FlexWrapper';
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
					<Field type='text' value={status} onChange={onInputChange} autoFocus={true} maxLength={30}/>
					</FieldWrapper>
				: <FlexWrapper gap='5px' align='center'>
					<Status onDoubleClick={changeEditMode}>{status}</Status>
					{props.isOwner && <CiEdit onClick={changeEditMode} />}
				 </FlexWrapper>
			}
		</StatusContainer>
	)
}

const StatusContainer = styled.div`
	margin-bottom: 60px;
	color: #FFF;

	svg {
		cursor: pointer;
		transition: all 0.3s ease 0s;
		width: 20px;
		height: 20px;
		&:hover{
			fill: ${theme.colors.accent};
		}
	}
`
const FieldWrapper = styled.div`
	position: relative;
	display: inline-flex;
	flex-direction: row-reverse;
`
const Field = styled.input`
	background-color: #e7e7e741;
	backdrop-filter: blur(15px);
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
	background-color: #edf1f5;
	padding: 0 10px;
	height: 34px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	border: none;
	
	position: relative;
	right: 40px;
	z-index: 2;
	color: ${theme.colors.accent};
	transition: all 0.3s ease 0s;
	
	&:hover{
		background-color: ${theme.colors.accent};
		svg {
			fill: #fff;
		}
	}
`
const Status = styled.div`
	display: inline-block;
	padding: 2px 10px;
	backdrop-filter: blur(15px);
	font-size: 16px;
	background-color: #e7e7e72a;
	border-radius: 8px;
`