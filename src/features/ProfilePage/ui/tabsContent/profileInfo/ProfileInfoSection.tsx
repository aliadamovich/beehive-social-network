import React, { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../../common/components/SectionTitle'
import { ProfileType } from '../../../../../common/types/types'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfileInfo, updateProfileInfoTC } from 'features/ProfilePage/model/profileSlice'
import { AppDispatch } from 'app/store'


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

