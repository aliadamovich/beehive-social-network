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
import { INITIAL_SEARCH_PARAMS, useGetUsersQuery, usersAPI } from 'features/UserPage/api/usersApi';
import { Pagination, Spin } from 'antd';
import { getUsersParams } from 'features/UserPage/api/usersApi.types';
import { CustomPagination } from 'common/components/customPagination/CustomPagination';
import { Loader } from 'common/components/Loader/Loader';
import { useEffect, useState } from 'react';

export const Users = () => {

	const [searchParams, setSearchParams] = useSearchParams()
	const appStatus = useSelector(selectStatus)
	const params = Object.fromEntries(searchParams)
	const [page, setPage] = useState(INITIAL_SEARCH_PARAMS.page);
	const [maxPage, setMaxPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	// const { data, isFetching, isLoading } = useGetUsersQuery({ page });
	const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
	const {data, isFetching, refetch } = useGetUsersQuery({...params, page})
	const users = data?.items
	
	useEffect(() => {
		// if (data) {
		// 	setMaxPage(Math.ceil(data.totalCount / INITIAL_SEARCH_PARAMS.count));
		// }
		// console.log(maxPage);
		// if (page >= maxPage) return

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			
			

			if (scrollTop + clientHeight >= scrollHeight && !isFetching && hasMore) {
				// setPage((prevPage) => prevPage + 1);

				clearTimeout(timerId)
				const newTimer = setTimeout(() => {
					setPage((prevPage) => prevPage + 1);
				}, 500)
				setTimerId(newTimer)
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			usersAPI.util.invalidateTags(["Users"]); 
			window.removeEventListener('scroll', handleScroll);
		}
	}, 
	[isFetching, hasMore]);

	useEffect(() => {
		console.log(data?.items.length);
		if (data?.items.length && data?.items.length < data?.totalCount) {
			setHasMore(false)
		}
	}, [data])

	const updateSearchParams = (newParams: Partial<Record<keyof getUsersParams, string>>) => {
		if (newParams.term === "") {
			searchParams.delete("term");
		} 

		setSearchParams(prevParams => {
			const updatedParams = { ...Object.fromEntries(prevParams), ...newParams };
			if(!newParams.term) delete updatedParams.term;
			return updatedParams
		});
		
		setPage(1)
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
						{/* <CustomPagination 
							onChange={changeCurrentPage}
							total={data?.totalCount}
							style={{marginBottom: '20px'}}
						/> */}
						<GridWrapper gap='15px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
						{users?.map(u =>
											<User u={u}
												key={u.id}
												// followingInProgress={followingInProgress}
												isLoading={false}
											/>)
						}
						</GridWrapper>
						{isFetching && (
							<div style={{ textAlign: 'center', margin: '20px 0' }}>
								<Spin />
							</div>
						)}
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
