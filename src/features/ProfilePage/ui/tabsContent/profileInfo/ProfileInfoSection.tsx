import { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../../common/components/SectionTitle'
import { useGetProfileQuery } from 'features/ProfilePage/api/profileApi'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'
import { useSafeUserId } from 'app/hooks/useSafeUserId'


export const ProfileInfoSection = ({ isOwner }: ProfileProps) => {
	const [editMode, setEditMode] = useState(false)
	const userId = useSafeUserId()
	const { data: profileData } = useGetProfileQuery(userId)

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