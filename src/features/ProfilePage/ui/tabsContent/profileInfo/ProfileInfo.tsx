import { FiEdit } from "react-icons/fi";
import styled from 'styled-components';
import { myTheme } from "../../../../../styles/Theme";
import { ContactsType, ProfileType } from "../../../../../common/types/types";

type ProfileInfoPropsType = {
	userProfile: ProfileType | null
	onEditClick: () => void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
	if (props.userProfile === null) return;

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
					<Value>{props.userProfile?.contacts[key as keyof ContactsType]}</Value>
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
		stroke: ${myTheme.colors.mainFontColor};
		cursor: pointer;
		&:hover{
			stroke: ${myTheme.colors.accent};
		}
	}

`
 const InfoBlock = styled.div`
	padding: 5px 10px;
	border-bottom: 1px solid ${myTheme.colors.borderColor};
	display: flex;
	align-items: center;
	gap: 15px;
	
`

export const Description = styled.span`
	font-weight: 600;
	color: ${myTheme.colors.boldFontColor};
	background-color: ${myTheme.colors.backgroundLayout};
	border-radius: 6px;
	padding: 5px 10px;
	min-width: 150px;
	text-transform: capitalize;
	display: flex;
	align-items: center;
`

const Value = styled.p`
	font-weight: 500;
`

const ContactsTitle = styled.h3`
	margin: 20px 0 10px 0;
	font-size: 16px;
`