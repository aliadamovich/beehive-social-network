import React, { useEffect } from 'react'
import { User } from '../../../UsersPage/User'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOnPage, obtainUsers, setCurrentPage } from '../../../../redux/selectors/users-selectors'
import { Pagination } from '../../../common/pagination/Pagination'
import { getUsersThunkCreator } from '../../../../redux/reducers/usersReducer'

export const FollowedFriends = ({toggleFollowUsers}) => {

	const users = useSelector(state => obtainUsers(state));
	const usersOnPage= useSelector(state => getUsersOnPage(state));
	const currentPage = useSelector(state => setCurrentPage(state));
	const dispatch = useDispatch();

	useEffect(() => { dispatch(getUsersThunkCreator(currentPage, usersOnPage, true)) }, 
		[currentPage, usersOnPage, dispatch])

	const changeCurrentPage = (pageNumber) => {
		dispatch(getUsersThunkCreator(pageNumber, usersOnPage, true))
	}

	return (
		<>
			<Pagination changeCurrentPage={changeCurrentPage} />
			<StyledFriends>
				{users.map(u => <User u={u} key={u.id} toggleFollowUsers={toggleFollowUsers}/>)}
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