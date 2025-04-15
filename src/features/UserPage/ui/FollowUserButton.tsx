import { useAppDispatch } from 'app/hooks/hooks'
import { MainButton } from 'common/components/MainButton'
import { useFollowUserMutation, useUnfollowUserMutation } from 'features/UserPage/api/usersApi'
import { DomainUser } from 'features/UserPage/api/usersApi.types'
import { updateStatusInfiniteQueryData, updateStatusQueryData } from 'features/UserPage/lib/updateStatusQueryData'
import { UserPropsType } from 'features/UserPage/ui/User'


export const FollowUserButton = ({ user, params }: UserPropsType) => {

	const [followUser, {isLoading: isFollowLoading}] = useFollowUserMutation()
	const [unfollowUser, { isLoading: isUnollowLoading }] = useUnfollowUserMutation()
	const dispatch = useAppDispatch();
	
	const toggleFollowUser = async () => {
		try {
				updateStatusInfiniteQueryData({ dispatch, params, userId: user.id, status: 'loading' })
				if (user.followed) {
					await unfollowUser(user.id).unwrap();
				} else {
					await followUser(user.id).unwrap();
				}
			} catch (error) {
				console.error('Ошибка подписки:', error);
			}
			finally {
				updateStatusInfiniteQueryData({ dispatch, params, userId: user.id, status: 'idle' })
			}
		};

	return (
		<MainButton
			children={user.followed ? 'Unfollow' : 'Follow'}
			onClick={toggleFollowUser} 
			loading={isFollowLoading || isUnollowLoading}
		/>
	)
}

