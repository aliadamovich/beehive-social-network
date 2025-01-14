import { Link } from 'react-router-dom';
import userPhoto from './../../../assets/images/user.png';
import { Card, Divider } from 'antd';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { useSelector } from 'react-redux';
import { Avatar } from 'common/components/Avatar';
import { MainButton } from 'common/components/MainButton';
import { UserType } from 'features/UserPage/api/usersApi.types';
import { useFollowUserMutation, useLazyCheckFollowQuery, useUnfollowUserMutation } from 'features/UserPage/api/usersApi';
import { useAppDispatch } from 'app/hooks';
import { selectFollowingInProgress, toggleFollowingProgress } from 'features/UserPage/model/usersSlice';


type UserPropsType = {
	u: UserType
	// toggleFollowUsers: (userId: number) => void
	// followingInProgress: number[]
	isLoading: boolean
}

export const User = ({ u, isLoading }: UserPropsType) => {
	const [followUser, {isLoading: isFollowLoading}] = useFollowUserMutation()
	const [unfollowUser, {isLoading: isUnfollowLoading}] = useUnfollowUserMutation()
	const dispatch = useAppDispatch();
	const [trigger] = useLazyCheckFollowQuery()
	const followingInProgress = useSelector(selectFollowingInProgress);

	const toggleFollowUser = async () => {
		try {
			dispatch(toggleFollowingProgress({ isFetching: true, userId: u.id }))
			const { data: isUserFollowed } = await trigger(u.id)
			if (isUserFollowed) {
					await unfollowUser(u.id)
			} else {
				await followUser(u.id)
			}
			// dispatch(toggleFollowingProgress({ isFetching: true, userId: u.id }))
			// if (u.followed) {
			// 	await unfollowUser(u.id)
			// } else {
			// 	await followUser(u.id)
			// }
		} catch (error) {
			
		} finally {
			dispatch(toggleFollowingProgress({ isFetching: false, userId: u.id }))
		}
	}

	return (
		<>
			<StyledUserCard>
				<StyledUserTop>

					<Link to={'/profile/' + u.id}>
						<Avatar photo={u.photos.small !== null ? u.photos.small : userPhoto} width='80px' height='80px' />
					</Link>
					
					<StyledUserData>
						<StyledUserName>{u.name}</StyledUserName>
						<p>Country:</p>
						<p>City:</p>
					</StyledUserData>

				</StyledUserTop>

				<StyledStatus><p>{u.status || 'No status yet...'}</p> </StyledStatus>
				<Divider style={{margin: '12px 0'}}/>
				<MainButton 
					children={u.followed ? 'Unfollow' : 'Follow'}
					onClick={toggleFollowUser} 
					loading={followingInProgress?.some(el => el === u.id) || isLoading === true }
				/>
			</StyledUserCard>
		</>
	)
}
const StyledUserCard = styled.div`
	border: 1px solid #f0f0f0;
	border-radius: 8px;
	padding: 20px;
	overflow: hidden;
`

const StyledUserTop = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`

const StyledUserData = styled.div`
	overflow: hidden;
	>*:not(:last-child) {
		margin-bottom: 4px;
	}
`

const StyledUserName = styled.h4`
	font-family: ${myTheme.fonts.secondary};
	color: ${myTheme.colors.boldFontColor};
	font-weight: 700;
	font-size: 15px;
`

const StyledStatus = styled.div`
	justify-content: center;
	display: flex;
	font-size: 15px;
	margin: 15px 0 0 0; 

	p {
		max-width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

`

