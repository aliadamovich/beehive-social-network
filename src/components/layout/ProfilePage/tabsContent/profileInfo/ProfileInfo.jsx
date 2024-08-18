import { FiEdit } from "react-icons/fi";
import styled from 'styled-components';
import { theme } from "../../../../../styles/Theme";


export const ProfileInfo = (props) => {
	
	return (

		<StyledProfile>
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

			<ContactsTitle>Contacts:</ContactsTitle>
			{Object.keys(props.userProfile.contacts).map(key => {
				return <InfoBlock key={key}>
					<Description>{key}:</Description>
					<Value>{props.userProfile.contacts[key]}</Value>
				</InfoBlock>
			})}
		</StyledProfile>
	)
}

const StyledProfile = styled.div`
	position: relative;
	padding: 20px;
	svg{
		position: absolute;
		top: 0;
		right: 10%;
		width: 18px;
		height: 18px;
		transition: all 0.3s ease 0s;
		stroke: ${theme.colors.mainFont};
		cursor: pointer;
		&:hover{
			stroke: ${theme.colors.accent};
		}
	}

`
 const InfoBlock = styled.div`
	padding: 5px 10px;
	border-bottom: 1px solid #edf1f5;
	display: flex;
	align-items: center;
	gap: 15px;
	
`

export const Description = styled.span`
	font-size: 14px;
	font-weight: 600;
	color: ${theme.colors.boldFont};
	background-color: #edf1f5;
	border-radius: 6px;
	padding: 5px 10px;
	min-width: 150px;
	text-transform: capitalize;
`

const Value = styled.p`
	font-weight: 500;
	font-size: 14px;
`

const ContactsTitle = styled.h3`
	margin: 20px 0 10px 0;
	font-size: 16px;
`