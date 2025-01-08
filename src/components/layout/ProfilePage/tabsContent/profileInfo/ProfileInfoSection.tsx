import React, { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../common/SectionTitle'
import { ProfileType } from '../../../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../../redux/redux-store'
import { selectProfileInfo, updateProfileInfoTC } from '../../../../../redux/reducers/profileSlice'


export const ProfileInfoSection = () => {
	const [editMode, setEditMode] = useState(false)
	const userProfile = useSelector(selectProfileInfo);
	const dispatch = useDispatch<AppDispatch>();

	const saveProfileInfo = (form: ProfileType) => {
		dispatch(updateProfileInfoTC(form))
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

