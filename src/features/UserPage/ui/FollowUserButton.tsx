import { useAppDispatch } from 'app/hooks'
import { MainButton } from 'common/components/MainButton'
import { useFollowUserMutation, useLazyCheckFollowQuery, useUnfollowUserMutation } from 'features/UserPage/api/usersApi'
import { updateStatusInfiniteQueryData, updateStatusQueryData } from 'features/UserPage/lib/updateStatusQueryData'
import { UserPropsType } from 'features/UserPage/ui/User'


export const FollowUserButton = ({user, params}: UserPropsType) => {

	const [followUser] = useFollowUserMutation()
	const [unfollowUser] = useUnfollowUserMutation()
	const dispatch = useAppDispatch();
	const [trigger] = useLazyCheckFollowQuery()
	
	const toggleFollowUser = async () => {
		try {

			updateStatusInfiniteQueryData({ dispatch, params, userId: user.id, status: 'loading' })
			const { data: isUserFollowed } = await trigger(user.id)
			if (isUserFollowed) {
				await unfollowUser(user.id).unwrap()
			} else {
				await followUser(user.id).unwrap()
			}
		} catch (error) {

		} finally {
			updateStatusInfiniteQueryData({ dispatch, params, userId: user.id, status: 'idle' })
		}
	}
	return (
		<MainButton
			children={user.followed ? 'Unfollow' : 'Follow'}
			onClick={toggleFollowUser} 
			loading={user.entityStatus === 'loading'}
		/>
	)
}

