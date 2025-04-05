import { User } from './User';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { useSearchParams } from 'react-router-dom';
import { UsersSkeleton } from './UsersSkeleton';
import { selectStatus } from '../../../app/appSlice';
import { GridWrapper } from 'common/components/GridWrapper';
import { Recent } from 'common/components/Recent/Recent';
import { Search } from 'common/components/Search/Search';
import { useGetInfiniteScrollUsersInfiniteQuery } from 'features/UserPage/api/usersApi';
import { Spin } from 'antd';
import { getUsersParams, InfiniteSearchType } from 'features/UserPage/api/usersApi.types';
import { useEffect } from 'react';

//! Не решена проблема бесконечного запроса при окончании юзеров 
export const Users = () => {

	const [searchParams, setSearchParams] = useSearchParams()
	const params: InfiniteSearchType = Object.fromEntries(searchParams)

	const { data, isFetching, isLoading, fetchNextPage } = useGetInfiniteScrollUsersInfiniteQuery({...params})
	const usersArray = data?.pages.flat();
	const users = usersArray?.map((ua) => ua.items).flat()
	

	const handleNextPage = async () => {
		const res = await fetchNextPage()
	}

	useEffect(() => {
		
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		}

	}, [isFetching])


	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
			handleNextPage()
		}
	}

	const updateSearchParams = (newParams: Partial<Record<keyof getUsersParams, string>>) => {
		setSearchParams((prevParams) => {
			const currentParams = Object.fromEntries(prevParams);
			const updatedParams = { ...currentParams, ...newParams };

			if (!newParams.term) {
				delete updatedParams.term;
			}
			return updatedParams;
		});
	};


	if (isLoading) return <UsersSkeleton />
	

	return (
		<>
			<Search
				debounceChange={(value: string) => { updateSearchParams({ term: value }) }}
				initialValue={params.term || ''}
			/>
			<StyledUsersContainer>
				<StyledUsersContent>

					<GridWrapper gap='15px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
						{users?.map(u =>
							<User user={u}
								key={u.id}
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

	@media ${myTheme.media[950]} {
		justify-content: center;
		>div:nth-child(2) {
			display: none;
		}
	}
`

const StyledUsersContent = styled.div`
	flex: 0 1 75%;
`
