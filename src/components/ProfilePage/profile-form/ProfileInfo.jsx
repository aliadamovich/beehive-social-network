import React from 'react'
import c from './ProfileForm.module.scss'
import { FiEdit } from "react-icons/fi";
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';



export const ProfileInfo = (props) => {
	
	return (
	
			<div>
			<FiEdit onClick={props.onEditClick} />

			<InfoBlock>
				<Description>About Me:</Description>
				<Value>{props.userProfile.aboutMe}</Value>
			</InfoBlock>

			<InfoBlock>
				<Description>Full name:</Description>
				<Value>{props.userProfile.fullName}</Value>
			</InfoBlock>
			
			<InfoBlock>
					<Description>Lookin for a job:</Description>
				<Value>{props.userProfile.lookingForAJob ? 'Yes' : 'No'}</Value>
				</InfoBlock>

			<InfoBlock>
				<Description>Job Description:</Description>
				<Value>{props.userProfile.lookingForAJobDescription}</Value>
			</InfoBlock>

			<h3>Contacts:</h3>
			{Object.keys(props.userProfile.contacts).map(key => {
				return <InfoBlock key={key}>
								<Description>{key}:</Description>
								<Value>{props.userProfile.contacts[key]}</Value>
							</InfoBlock>
			})}
			</div>
	)
}

const InfoBlock = styled.div`
	padding: 10px;
	border-bottom: 1px sold #edf1f5;
	display: flex;
	align-items: center;
	gap: 15px;
`

const Description = styled.span`
	font-size: 14px;
	font-weight: 600;
	color: ${theme.colors.boldFont};
	background-color: #edf1f5;
	padding: 5px;
	min-width: 150px;
`

const Value = styled.p`
	font-weight: 400;
	font-size: 14px;
`