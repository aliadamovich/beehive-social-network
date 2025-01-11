import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../../../../common/pagination/Pagination'
import { User } from '../../../UsersPage/User'
import { Loader } from '../../../../common/Loader/Loader'
import { followUsersThunkCreator, getUsersTC, resetSearchParams, selectFollowingInProgress, selectUsers } from '../../../../../redux/reducers/usersSlice'
import { useAppDispatch } from '../../../../../redux/app/hooks'



export const FollowedFriends = ({isOwner} : {isOwner: boolean}) => {

	const users = useSelector(selectUsers)
	const followingInProgress = useSelector(selectFollowingInProgress)


	const dispatch = useAppDispatch()
	const toggleFollowUsers = (userId: number) => { 
		dispatch(followUsersThunkCreator(userId)) 
	}
	console.log(users);

	useEffect(() => {
		if (!isOwner) return;
		dispatch(getUsersTC({page: 1, count: 10, term: 'd', friend: true}))
		// dispatch(getUsersThunkCreator({}))
		return () => {
			dispatch(resetSearchParams())
		}
	}, [])
	// , [currentPage, usersOnPage, dispatch]);


	if (!isOwner) return <div>No friends yet...</div>

	return (

		<StyledFriends>
			{users.map(u => <User 
												u={u} 
												key={u.id} 
												toggleFollowUsers={toggleFollowUsers} 
												followingInProgress={followingInProgress}/>)
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