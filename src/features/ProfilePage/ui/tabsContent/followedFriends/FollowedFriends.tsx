import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../../../../../common/components/pagination/Pagination'
import { Loader } from '../../../../../common/components/Loader/Loader'
import { useAppDispatch } from 'app/hooks'
import { followUserTC, getUsersTC, resetSearchParams, selectFollowingInProgress, selectUsers } from 'features/UserPage/model/usersSlice'
import { User } from 'features/UserPage/ui/User'


export const FollowedFriends = ({isOwner} : {isOwner: boolean}) => {

	const users = useSelector(selectUsers)
	const followingInProgress = useSelector(selectFollowingInProgress)


	const dispatch = useAppDispatch()
	const toggleFollowUsers = (userId: number) => { 
		dispatch(followUserTC(userId)) 
	}
	console.log(users);

	useEffect(() => {
		if (!isOwner) return;
		dispatch(getUsersTC({page: 1, count: 10,  friend: true}))
		return () => {
			dispatch(resetSearchParams())
		}
	}, [])


	if (!isOwner) return <div>No friends yet...</div>

	return (

		<StyledFriends>
			{users.map(u => <User
												u={u} 
												key={u.id} 
												toggleFollowUsers={toggleFollowUsers} 
												followingInProgress={followingInProgress}
												/>
												)
			}
		</StyledFriends>

	)
}

const StyledFriends = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 5px;
	/* padding: 10px; */
`