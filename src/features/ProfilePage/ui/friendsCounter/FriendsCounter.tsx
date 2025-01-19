import styled from 'styled-components'
import { myTheme } from '../../../../styles/Theme'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'
import { useGetUsersQuery } from 'features/UserPage/api/usersApi'

export const FriendsCounter = ({profileId, isOwner}: ProfileProps) => {
	const { data: friends} = useGetUsersQuery({friend: true})

	return (
		<StyledCounter>
			<Counter>
				<span>{isOwner ? friends?.totalCount : 0}</span>
				Friends
			</Counter>
			<Counter>
				<span>0</span>
				Groups
			</Counter>
		</StyledCounter>
	)
}

const StyledCounter = styled.div`
	display: flex;
	justify-content: center;
	gap: 25px;
	border-bottom: 1px solid ${myTheme.colors.borderColor};
	padding-bottom: 15px;
`

const Counter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 11px;
	gap: 5px;
	font-weight: 500;
	color: ${myTheme.colors.mainFontColor};
		span {
			color: ${myTheme.colors.accent};
			font-size: 20px;
			font-weight: 700;
		}
`