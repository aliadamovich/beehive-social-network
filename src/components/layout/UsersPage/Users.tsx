import { useEffect, useState } from 'react';
import { User } from './User';
import { useSelector } from 'react-redux';
import { getFollowingInProgress, getIsFetching, getTotalUsers, getUsersOnPage, obtainUsers, getCurrentPage } from '../../../redux/selectors/users-selectors';
import { followUsersThunkCreator, getUsersThunkCreator } from '../../../redux/reducers/usersReducer';
import { Pagination } from '../../common/pagination/Pagination';
import { useAppDispatch } from '../../../redux/app/hooks';
import { AppStateType } from '../../../redux/redux-store';
import { Recent } from '../../common/Recent/Recent';
import { AppStatusType } from '../../../redux/reducers/appReducer';
import styled from 'styled-components';
import { GridWrapper } from '../../common/GridWrapper';


export const Users = () => {
	const users = useSelector(obtainUsers)
	const totalUsers = useSelector(getTotalUsers)
	const usersOnPage = useSelector(getUsersOnPage)
	const currentPage = useSelector(getCurrentPage)
	const followingInProgress = useSelector(getFollowingInProgress);
	const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status);

	const [activePage, setActivePage] = useState(1)
	const dispatch = useAppDispatch()

	useEffect(() => {dispatch(getUsersThunkCreator(currentPage, usersOnPage))}, [])

	const toggleFollowUsers = async (userId: number) => {
		dispatch(followUsersThunkCreator(userId));
	}

	//ф-ция для пагинатора
	const changeCurrentPage = (currentPage: number) => {
		dispatch(getUsersThunkCreator(currentPage, usersOnPage))
	}
 

	return (
		<StyledUsersContainer>
			<StyledUsersContent>
				<Pagination
					usersOnPage={usersOnPage}
					changeCurrentPage={changeCurrentPage}
					totalUsers={totalUsers}
					activePage={activePage}
					setActivePage={setActivePage}
				/>
				<GridWrapper gap='15px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
					{
						users.map(u => 
						<User u={u}
							toggleFollowUsers={toggleFollowUsers}
							key={u.id}
							followingInProgress={followingInProgress}
							appStatus={appStatus}
						/>
					)}
				</GridWrapper>
			</StyledUsersContent>
			<Recent />
		</StyledUsersContainer>
	)
}

const StyledUsersContainer = styled.div`
	position: relative;
	overflow: hidden;
	padding: 20px 10px;
	border-top: 1px solid rgb(237, 241, 245);
	display: flex;
	gap: 40px;

	>div:nth-child(2) {
		flex: 1 1 auto;
	}
`

const StyledUsersContent = styled.div`
	flex: 0 1 75%;
`
