import { useEffect, useLayoutEffect, useState } from 'react';
import { User } from './User';
import { useSelector } from 'react-redux';
import { getFollowingInProgress, getIsFetching, getTotalUsers, getUsersOnPage, obtainUsers, getCurrentPage, getSearchParams } from '../../../redux/selectors/users-selectors';
import { followUsersThunkCreator, getUsersThunkCreator } from '../../../redux/reducers/usersReducer';
import { Pagination } from '../../common/pagination/Pagination';
import { useAppDispatch } from '../../../redux/app/hooks';
import { AppStateType } from '../../../redux/redux-store';
import { Recent } from '../../common/Recent/Recent';
import { AppStatusType } from '../../../redux/reducers/appReducer';
import styled from 'styled-components';
import { GridWrapper } from '../../common/GridWrapper';
import { myTheme } from '../../../styles/Theme';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../../common/Search/Search';


export const Users = () => {
	const users = useSelector(obtainUsers)
	const totalUsers = useSelector(getTotalUsers)
	const usersOnPage = useSelector(getUsersOnPage)
	const currentPage = useSelector(getCurrentPage)
	const followingInProgress = useSelector(getFollowingInProgress);
	const [activePage, setActivePage] = useState(1)
	const [find, setFind] = useState('');
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const params = Object.fromEntries(searchParams)
	// const initialParams = useSelector(getSearchParams)

	useEffect(() => {
		setSearchParams({
		...params,
		count: usersOnPage.toString(),
		page: currentPage.toString(),
	})
		setFind(params.find || '')
		dispatch(getUsersThunkCreator({}))
	}, [])

	const toggleFollowUsers = async (userId: number) => {
		dispatch(followUsersThunkCreator(userId));
	}

	const changeCurrentPage = (currentPage: number) => {
		dispatch(getUsersThunkCreator({page: currentPage}))
			.then(() => {
				setSearchParams({ ...params, page: currentPage.toString() })
		})
		
	}

	const debounceChangeHandler = (value: string) => {
		dispatch(getUsersThunkCreator({term: value}))
	}

	const searchInputChangeHandler = (searchValue: string) => {
		setFind(searchValue)
		setSearchParams({ ...params, find: searchValue })
	}

	return (
		<>
			<Search 
				debounceChange={debounceChangeHandler}
				searchInputChangeHandler={searchInputChangeHandler}
				value={find}
			/>
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
							/>
						)}
					</GridWrapper>
				</StyledUsersContent>
				<Recent />
			</StyledUsersContainer>
		</>
	)
}

const StyledUsersContainer = styled.div`
	position: relative;
	overflow: hidden;
	padding: 20px 10px;
	border-top: 1px solid ${myTheme.colors.borderColor};
	display: flex;
	gap: 40px;

	>div:nth-child(2) {
		flex: 1 1 auto;
	}
`

const StyledUsersContent = styled.div`
	flex: 0 1 75%;
`
