import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'
import { ProfilePhoto } from 'features/ProfilePage/ui/ProfileUser/ProfilePhoto'
import { ProfileStatus } from 'features/ProfilePage/ui/ProfileUser/ProfileStatus'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'

export const ProfileUser = ({ isOwner }: ProfileProps) => {
	return (
		<StyledProfileUser>
			<ProfilePhoto isOwner={isOwner} />
			<ProfileStatus isOwner={isOwner} />
		</StyledProfileUser>
	)
}

export const StyledProfileUser = styled.div`
	text-align: center;
	position: relative;
	@media ${myTheme.media[950]} {
		display: flex;
		align-items: flex-end;
		flex-wrap: wrap;
		padding: 0 10px;
	}

	@media ${myTheme.media[768]} {
		flex-direction: column;
		align-items: center;
	}

	@media ${myTheme.media[576]} {
	align-items: center;
	padding: 0;
	gap: 10px;
}
`
