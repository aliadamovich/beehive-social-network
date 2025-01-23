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
import { useCallback, useEffect, useState } from 'react';

export const Users = () => {
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const appStatus = useSelector(selectStatus)
	const params: getUsersParams = Object.fromEntries(searchParams)
	const upd = { ...params, page: params.page ? Number(params.page) : 1, count: params.count ? Number(params.count) : INITIAL_SEARCH_PARAMS.count }
	const [page, setPage] = useState(INITIAL_SEARCH_PARAMS.page);
	const [hasMore, setHasMore] = useState(true);
	const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
	const {data, isFetching, isLoading } = useGetUsersQuery({...upd})
	const users = data?.items
	const [maxPage, setMaxPage] = useState<null | number>(null); 
console.log(params);
	//! Не решена проблема бесконечного запроса при окончании юзеров и проблема перехода на страницу профайла с юзеров
	// const maxPage = Math.ceil(totalCount / INITIAL_SEARCH_PARAMS.count)
	// console.log(maxPage, 'maxPage');
	// useEffect(() => {
	// 	console.log('page1' , page);
	// 	if (totalCount > 0) { // Убедитесь, что данные загружены
	// 		const maxPage = Math.ceil(totalCount / INITIAL_SEARCH_PARAMS.count);
	// 		if (page > maxPage) {
	// 			setHasMore(false)
	// 		} else {
	// 			setHasMore(true); // Сбрасываем, если появилась новая страница
	// 		}
	// 	}
	 
	// }, [ totalCount, page])
	// useEffect(() => {
		
	// 	// if (data)
	// 	// 	setMaxPage(Math.ceil(data.totalCount / INITIAL_SEARCH_PARAMS.count));
	// 	console.log('page2', page);


	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => {
	// 		// usersAPI.util.invalidateTags(["Users"]);
	// 		window.removeEventListener('scroll', handleScroll);
	// 	}
	// }, 
	// 	[ ]);
	// useEffect(() => {
	// 	if (data?.totalCount) {
	// 		// debugger
	// 		setMaxPage(Math.ceil(data.totalCount / INITIAL_SEARCH_PARAMS.count));
	// 	}
	// 	if (maxPage && page > maxPage) {
	// 		setHasMore(false);
	// 	} else {
	// 		setHasMore(true);
	// 	}
	// },[data, page, maxPage])
	console.log(users);
		useEffect(() => {
			
			window.addEventListener('scroll', handleScroll);
			return () => {
				// usersAPI.util.invalidateTags(["Users"]);
				window.removeEventListener('scroll', handleScroll);
			}

		// }, [page, searchParams])
		}, [isFetching, hasMore, maxPage])


	// const loadMore = () => {
	// 	if (maxPage && page <= maxPage) {
	// 		setPage((prevPage) => prevPage + 1)
	// 	}
	// }
	const loadMore = () => {
		// if (maxPage && page < maxPage && hasMore) {
			// setPage((prevPage) => prevPage + 1);
			setSearchParams((prevParams) => ({
				...Object.fromEntries(prevParams),
				page: (Number(prevParams.get("page") || 1) + 1).toString(),
			}));
		// }
	}
	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

		if (
			scrollTop + clientHeight >= scrollHeight &&
			hasMore &&
			!isFetching
		) {
			loadMore();
		}
	}
	// const handleScroll = () => {

	// 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	// 	if ((scrollTop + clientHeight >= scrollHeight) && hasMore && !isFetching) {
	// 		console.log('scroll');
	// 		// setPage((prevPage) => prevPage + 1)
	// 		// clearTimeout(timerId)
	// 		// const newTimer = setTimeout(() => {
	// 		// 	setPage((prevPage) => {
	// 		// 		const newPage = prevPage + 1
	// 		// 		console.log('page3', newPage);
	// 		// 		return newPage
	// 		// 	});

	// 		// }, 500)
	// 		// setTimerId(newTimer)
	// 		loadMore()
	// 	}
	// };
	const updateSearchParams = (newParams: Partial<Record<keyof getUsersParams, string>>) => {
		if (newParams.term === "") {
			searchParams.delete("term");
		} 

		setSearchParams(prevParams => {
			const updatedParams = { ...Object.fromEntries(prevParams), 
				...newParams, page: '1' };
			if(!newParams.term) delete updatedParams.term;

			return updatedParams
		});
		console.log(params);
		// setPage(1)
		setHasMore(true)
		setMaxPage(null);
	}

	const searchInputChangeHandler = (value: string) => {
		updateSearchParams({ term: value })
	}


	if (isLoading) return <UsersSkeleton />
	

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
												params={params}
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
