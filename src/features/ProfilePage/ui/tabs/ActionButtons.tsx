import { Skeleton } from 'antd'
import { MainButton } from 'common/components/MainButton'
import { useGetUsersQuery } from 'features/UserPage/api/usersApi'
import { FollowUserButton } from 'features/UserPage/ui/FollowUserButton'
import { NavLink, useParams } from 'react-router-dom'
import { PATH } from 'routes/routes'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'

export const ActionButtons = () => {
	const {userId} = useParams();
	const { data, isFetching, isLoading } = useGetUsersQuery({})
	// const user = data?.items?.find(u => u.id === Number(userId))
	// console.log('userId', userId);
	console.log('data', data);
	console.log(data);
// debugger
	return (
		<>
			<StyledButtons>
				<NavLink to={`${PATH.DIALOGS}/${userId}`}>
					<span><MainButton children='Start dialog' loading={false} /></span>
				</NavLink>
				
				{/* {user && <FollowUserButton user={user} params={{}} />} */}
			</StyledButtons>
		</>
	)
}

const StyledButtons = styled.div`
display: flex;
	flex-direction: column;
	gap: 10px;

	@media ${myTheme.media[950]} {
		flex: 0 0 300px;
		padding: 0 20px;
	}

	@media ${myTheme.media[768]} {
		flex: 1 1 auto;
		flex-direction: row;
	}
`