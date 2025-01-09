import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../../redux/redux-store'
import { Pagination } from '../../../../common/pagination/Pagination'
import { User } from '../../../UsersPage/User'
import { Loader } from '../../../../common/Loader/Loader'
import { followUsersThunkCreator, getUsersThunkCreator, selectFollowingInProgress, selectUsers } from '../../../../../redux/reducers/usersSlice'



export const FollowedFriends = ({isOwner} : {isOwner: boolean}) => {

	const users = useSelector(selectUsers)
	// const totalUsers = useSelector(getTotalUsers)
	// const usersOnPage = useSelector(getUsersOnPage)
	// const currentPage = useSelector(getCurrentPage)
	const followingInProgress = useSelector(selectFollowingInProgress) 
	// const isFetching = useSelector(getIsFetching)

	const dispatch = useDispatch<AppDispatch>();
	const toggleFollowUsers = (userId: number) => { dispatch(followUsersThunkCreator(userId)) }
	const [activePage, setActivePage] = useState(1)

	useEffect(() => {
		// if (!isOwner) return;
		// dispatch(getUsersThunkCreator({friend: true})) 
	}, [])
	// , [currentPage, usersOnPage, dispatch]);

	const changeCurrentPage = (pageNumber: number) => {
		// dispatch(getUsersThunkCreator(pageNumber, usersOnPage, true))
	}

	if (!isOwner) return <div>No friends yet...</div>

	return (

		<>
			{/* {isFetching ? <Loader /> : null} */}
			{/* <Pagination 
				usersOnPage={usersOnPage} 
				changeCurrentPage={changeCurrentPage}
				totalUsers={totalUsers}
				activePage={activePage}
				setActivePage={setActivePage}
			/> */}
			<StyledFriends>
				{users.map(u => <User u={u} key={u.id} toggleFollowUsers={toggleFollowUsers} followingInProgress={followingInProgress}/>)}
			</StyledFriends>
		</>
	)
}

const StyledFriends = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 5px;
	/* padding: 10px; */
`