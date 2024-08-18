import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalUsers, getUsersOnPage, obtainUsers, getCurrentPage, getFollowingInProgress, getIsFetching } from '../../../../../redux/selectors/users-selectors'
import { AppDispatch } from '../../../../../redux/redux-store'
import { followUsersThunkCreator, getUsersThunkCreator } from '../../../../../redux/reducers/usersReducer'
import { Pagination } from '../../../../common/pagination/Pagination'
import { User } from '../../../UsersPage/User'
import { Loader } from '../../../../common/Loader/Loader'



export const FollowedFriends = () => {

	const users = useSelector(obtainUsers)
	const totalUsers = useSelector(getTotalUsers)
	const usersOnPage = useSelector(getUsersOnPage)
	const currentPage = useSelector(getCurrentPage)
	const followingInProgress = useSelector(getFollowingInProgress) 
	const isFetching = useSelector(getIsFetching)

	const dispatch = useDispatch<AppDispatch>();
	const toggleFollowUsers = (userId: number) => { dispatch(followUsersThunkCreator(userId)) }
	const [activePage, setActivePage] = useState(1)

	useEffect(() => { dispatch(getUsersThunkCreator(currentPage, usersOnPage, true)) }, 
		[currentPage, usersOnPage, dispatch])

	const changeCurrentPage = (pageNumber: number) => {
		dispatch(getUsersThunkCreator(pageNumber, usersOnPage, true))
	}

	return (

		<>
			{isFetching ? <Loader /> : null}
			<Pagination 
				usersOnPage={usersOnPage} 
				changeCurrentPage={changeCurrentPage}
				totalUsers={totalUsers}
				activePage={activePage}
				setActivePage={setActivePage}
			/>
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