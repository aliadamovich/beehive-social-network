import React, { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../common/SectionTitle'
import { ProfileType } from '../../../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { saveProfileInfoTC } from '../../../../../redux/reducers/profileReducer'
import { AppDispatch } from '../../../../../redux/redux-store'
import { getProfile } from '../../../../../redux/selectors/profile-selectors'


export const ProfileInfoSection = () => {
	const [editMode, setEditMode] = useState(false)
	const userProfile = useSelector(getProfile);
	const dispatch = useDispatch<AppDispatch>();

	const saveProfileInfo = (form: ProfileType) => {
		dispatch(saveProfileInfoTC(form))
	}
	const onEditClick = () => {
		setEditMode(!editMode)
	}
	return (
		<>
			<SectionTitle>Personal Information:</SectionTitle>
			{userProfile &&
			editMode
				? <ProfileForm userProfile={userProfile} saveProfileInfo={saveProfileInfo} onEditClick={onEditClick} />
				: <ProfileInfo userProfile={userProfile} onEditClick={onEditClick} />
		}
		</>
	)
}

