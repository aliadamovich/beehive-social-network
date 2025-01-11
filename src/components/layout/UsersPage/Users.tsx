import { useEffect, useState } from 'react';
import { User } from './User';
import { useSelector } from 'react-redux';
import { Pagination } from '../../common/pagination/Pagination';
import { useAppDispatch } from '../../../redux/app/hooks';
import { Recent } from '../../common/Recent/Recent';
import styled from 'styled-components';
import { GridWrapper } from '../../common/GridWrapper';
import { myTheme } from '../../../styles/Theme';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../../common/Search/Search';
import { UsersSkeleton } from './UsersSkeleton';
import { followUsersThunkCreator, getUsersTC, resetSearchParams, selectFollowingInProgress, selectSearchParams, selectTotalUsers, selectUsers, updateParams } from '../../../redux/reducers/usersSlice';
import { selectStatus } from '../../../redux/reducers/appSlice';

export type SearchParamsType = "count" | "page" | "term" | "friend";
export const Users = () => {
	const users = useSelector(selectUsers)
	const totalUsers = useSelector(selectTotalUsers)
	const followingInProgress = useSelector(selectFollowingInProgress);
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const appStatus = useSelector(selectStatus)
	const params = Object.fromEntries(searchParams)
	const {count, friend, page} = useSelector(selectSearchParams)

	useEffect(() => {
		// dispatch(getUsersThunkCreator({...params}))
		dispatch(getUsersTC({...params}))
		return () => {
			dispatch(resetSearchParams())
		}
	}, [])

	const toggleFollowUsers = async (userId: number) => {
		dispatch(followUsersThunkCreator(userId));
	}
	

	const changeCurrentPage = async (currentPage: number) => {
		updateSearchParams({ page: currentPage.toString() })
		// dispatch(getUsersThunkCreator({...params, page: currentPage}))
		dispatch(getUsersTC({...params, page: currentPage}))
	}
	// Partial<Record<SearchParamsType, string>>
	const updateSearchParams = (newParams: any) => {
			setSearchParams(prevParams => ({
				...Object.fromEntries(prevParams),
				...newParams,
			}));
		dispatch(updateParams({ params: newParams }));
	}

	const searchInputChangeHandler = (value: string) => {
		// dispatch(getUsersThunkCreator({term: value}))
		dispatch(getUsersTC({term: value}))
	}

	// const searchInputChangeHandler = (searchValue: string) => {
	// 	setSearchParams({ ...params, term: searchValue })
	// }

	// if(appStatus === 'loading') return <UsersSkeleton />

	return (
		<>
			<Search
				updateSearchParams={updateSearchParams}
				debounceChange={searchInputChangeHandler}
				// searchInputChangeHandler={searchInputChangeHandler}
				value={params.term || ''}
			/>
			{appStatus === 'loading' ? <UsersSkeleton /> :
				<StyledUsersContainer>
					<StyledUsersContent>
						<Pagination
							usersOnPage={count}
							changeCurrentPage={changeCurrentPage}
							totalUsers={totalUsers}
							activePage={page}
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
			}
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
