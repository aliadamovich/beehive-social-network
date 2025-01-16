import { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../../common/components/SectionTitle'
import { ProfileType } from 'features/ProfilePage/api/profileApi.types'
import { useSetProfileInfoMutation } from 'features/ProfilePage/api/profileApi'

type Props = {
	profileData: ProfileType | undefined
}
export const ProfileInfoSection = ({ profileData }: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [setProfileInfo] = useSetProfileInfoMutation()

	const saveProfileInfo = (form: ProfileType) => {
		setProfileInfo(form)
	}
	const onEditClick = () => {
		setEditMode(!editMode)
	}
	return (
		<>
			<SectionTitle>Personal Information:</SectionTitle>
			{profileData &&
			editMode
				? <ProfileForm userProfile={profileData} saveProfileInfo={saveProfileInfo} onEditClick={onEditClick} />
				: <ProfileInfo userProfile={profileData} onEditClick={onEditClick} />
		}
		</>
	)
}

