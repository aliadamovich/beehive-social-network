import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/Theme'
import { CiEdit } from "react-icons/ci";
import { FlexWrapper } from '../common/FlexWrapper';

export const ProfileStatus = (props) => {
	// debugger
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)

	//исп-ем хук чтобы он подгрузил статус когда в пропсах он придет (указываем зависимость - )
	useEffect(() => { setStatus(props.status) }, [props.status])

	const changeEditMode = () => {
		if(props.profileOwnerId === props.currentUserId) {
			setEditMode(!editMode)
		}
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
					<StatusButton onClick={onButtonClickHandler}>&rarr;</StatusButton>
					<Field type='text' value={status} onChange={onInputChange} autoFocus={true} maxLength={30}/>
					</FieldWrapper>
				: <FlexWrapper gap='5px' align='center'>
					<Status onDoubleClick={changeEditMode}>{status}</Status>
					{props.profileOwnerId === props.currentUserId && <CiEdit onClick={changeEditMode} />}
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
	background-color: #e7e7e77f;
	backdrop-filter: blur(15px);
	border-radius: 16px;
	border: 1px solid #fff;
	padding: 5px 0 5px 10px;
	width: 350px;
	height: 35px;
	font-size: 16px;
	&::placeholder {
		font-size: 14px;
		color: ${theme.colors.borderColor};
	}
`

const StatusButton = styled.button`
	background-color: #fff;
	padding: 0 10px;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	font-weight: 500;
	font-size: 20px;
	position: relative;
	right: 34px;
	z-index: 2;
	color: ${theme.colors.accent};
	transition: all 0.3s ease 0s;
	
	&:hover{
		background-color: ${theme.colors.accent};
		color: #fff;
		~input {
			border: 1px solid ${theme.colors.accent};
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