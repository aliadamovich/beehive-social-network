import { User } from './User';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { useSearchParams } from 'react-router-dom';
import { UsersSkeleton } from './UsersSkeleton';
import { selectStatus } from '../../../app/appSlice';
import { useAppDispatch } from 'app/hooks';
import { GridWrapper } from 'common/components/GridWrapper';
import { Recent } from 'common/components/Recent/Recent';
import { selectFollowingInProgress } from 'features/UserPage/model/usersSlice';
import { Search } from 'common/components/Search/Search';
import { INITIAL_SEARCH_PARAMS, useGetUsersQuery } from 'features/UserPage/api/usersApi';
import { Pagination } from 'antd';
import { getUsersParams } from 'features/UserPage/api/usersApi.types';
import { CustomPagination } from 'common/components/customPagination/CustomPagination';

export const Users = () => {
	const followingInProgress = useSelector(selectFollowingInProgress);
	const [searchParams, setSearchParams] = useSearchParams()
	const appStatus = useSelector(selectStatus)
	const params = Object.fromEntries(searchParams)

	const {data, isLoading, isFetching } = useGetUsersQuery(params)
	const users = data?.items
	
	// const toggleFollowUsers = async (userId: number) => {
	// 	dispatch(followUserTC(userId));
	// }

	const changeCurrentPage = (currentPage: number) => {
		updateSearchParams({ page: currentPage.toString() })
	}

	const updateSearchParams = (newParams: Partial<Record<keyof getUsersParams, string>>) => {
			setSearchParams(prevParams => ({
				...Object.fromEntries(prevParams),
				...newParams,
			}));
		// dispatch(updateParams({ params: newParams }));
	}

	const searchInputChangeHandler = (value: string) => {
		updateSearchParams({ term: value })
	}


	// if(appStatus === 'loading') return <UsersSkeleton />

	return (
		<>
			<Search
				debounceChange={searchInputChangeHandler}
				initialValue={params.term || ''}
			/>
			{appStatus === 'loading' ? <UsersSkeleton /> :
				<StyledUsersContainer>
					<StyledUsersContent>
						<CustomPagination 
							onChange={changeCurrentPage}
							total={data?.totalCount}
							style={{marginBottom: '20px'}}
						/>
						<GridWrapper gap='15px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
							{
								users?.map(u =>
									<User u={u}
										key={u.id}
										followingInProgress={followingInProgress}
										isLoading={isFetching}
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
