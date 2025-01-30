import { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../../common/components/SectionTitle'
import { ProfileType } from 'features/ProfilePage/api/profileApi.types'
import { useSetProfileInfoMutation } from 'features/ProfilePage/api/profileApi'
import { selectProfileData } from 'features/ProfilePage/model/selectors/profileDataSelector'
import { useSelector } from 'react-redux'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'


export const ProfileInfoSection = ({ profileId, isOwner }: ProfileProps) => {
	const [editMode, setEditMode] = useState(false)
	const profileData = useSelector(selectProfileData(profileId))
	// const [setProfileInfo] = useSetProfileInfoMutation()

	// const saveProfileInfo = (form: ProfileType) => {
	// 	setProfileInfo(form)
	// }

	return (
		<>
			<StyledHeader><SectionTitle>Personal Information:</SectionTitle></StyledHeader>
			{
				profileData && editMode
					? <ProfileForm userProfile={profileData} setEditMode={() => { setEditMode(!editMode) }} />
				: <ProfileInfo userProfile={profileData} editProfileHandler={() => { setEditMode(!editMode) }} isOwner={isOwner} />
			}
		</>
	)
}

const StyledHeader = styled.div`
	@media ${myTheme.media[576]} {
		padding: 0 10px;
	}
`