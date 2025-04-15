import { useState } from 'react'
import { ProfileForm } from './ProfileForm'
import { ProfileInfo } from './ProfileInfo'
import { SectionTitle } from '../../../../../common/components/SectionTitle'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'
import { useSafeUserId } from 'app/hooks/useSafeUserId'


export const ProfileInfoSection = () => {
	const [editMode, setEditMode] = useState(false)
	const { isOwner, profileData } = useSafeUserId()

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