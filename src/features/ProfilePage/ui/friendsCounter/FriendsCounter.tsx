import styled from 'styled-components'
import { myTheme } from '../../../../styles/Theme'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'
import { useGetUsersQuery } from 'features/UserPage/api/usersApi'
import { useEffect, useState } from 'react'
import { useSafeUserId } from 'app/hooks/useSafeUserId'

export const FriendsCounter = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 950;

	useEffect(() => {
		window.addEventListener("resize", () => setWidth(window.innerWidth));
	}, []);
	return (
		<>
			{width > breakpoint && <Counter /> }
		</>
	)
} 

const Counter = () => {
	const { data: friends } = useGetUsersQuery({ friend: true, count: 6 });
	const { isOwner } = useSafeUserId()
	
	return (
		<StyledCounter>
			<CounterItem>
				<span>{isOwner ? friends?.totalCount : 0}</span>
				Friends
			</CounterItem>
			<CounterItem>
				<span>0</span>
				Groups
			</CounterItem>
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

const CounterItem = styled.div`
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