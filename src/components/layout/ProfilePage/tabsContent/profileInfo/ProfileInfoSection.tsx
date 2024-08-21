import React, { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../common/SectionTitle'
import { ProfileType } from '../../../../../types/types'

type ProfileInfoSectionType = {
	userProfile: ProfileType | null
	saveProfileInfo: (values: ProfileType) => void
}

export const ProfileInfoSection = (props: ProfileInfoSectionType) => {
	const [editMode, setEditMode] = useState(false)

	const onEditClick = () => {
		setEditMode(!editMode)
	}
	return (
		<>
			<SectionTitle>Personal Information:</SectionTitle>
			{props.userProfile &&
			editMode
				? <ProfileForm userProfile={props.userProfile} saveProfileInfo={props.saveProfileInfo} onEditClick={onEditClick} />
				: <ProfileInfo userProfile={props.userProfile} onEditClick={onEditClick} />
		}
		</>
	)
}

