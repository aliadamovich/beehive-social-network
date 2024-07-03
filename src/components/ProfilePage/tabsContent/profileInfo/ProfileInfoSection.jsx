import React, { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../common/SectionTitle'
import styled from 'styled-components'

export const ProfileInfoSection = (props) => {
	const [editMode, setEditMode] = useState(false)

	const onEditClick = () => {
		setEditMode(!editMode)
	}
	return (
		<StyledProfileInfoSection>
			<SectionTitle>Personal Information:</SectionTitle>
						 {
			editMode
				? <ProfileForm userProfile={props.userProfile} saveProfileInfo={props.saveProfileInfo} onEditClick={onEditClick} />
				: <ProfileInfo userProfile={props.userProfile} onEditClick={onEditClick} />
		}
		</StyledProfileInfoSection>
	)
}


const StyledProfileInfoSection = styled.div`
	padding: 30px 20px 0;
	grid-area: posts;
	border-right: 1px solid #edf1f5;
	border-left: 1px solid #edf1f5;
`