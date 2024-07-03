import React, { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../common/SectionTitle'

export const ProfileInfoSection = (props) => {
	const [editMode, setEditMode] = useState(false)

	const onEditClick = () => {
		setEditMode(!editMode)
	}
	return (
		<>
			<SectionTitle>Personal Information:</SectionTitle>
						 {
			editMode
				? <ProfileForm userProfile={props.userProfile} saveProfileInfo={props.saveProfileInfo} onEditClick={onEditClick} />
				: <ProfileInfo userProfile={props.userProfile} onEditClick={onEditClick} />
		}
		</>
	)
}

