import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { User } from 'features/UserPage/ui/User'
import { INITIAL_SEARCH_PARAMS, useGetUsersQuery } from 'features/UserPage/api/usersApi'
import { CustomPagination } from 'common/components/customPagination/CustomPagination'
import { GridWrapper } from 'common/components/GridWrapper'
import { UsersSkeleton } from 'features/UserPage/ui/UsersSkeleton'

//!ОШИБКА ПРИ ПЕРЕЛИСТЫВАНИИ СТРАНИЦ - В КЭШ ДОБАЛЯЮТСЯ НОВЫЕ ЮЗЕРЫ А НЕ ЗАМЕЩАЮТСЯ НОВЫМИ ИЗЗА merge

export const FollowedFriends = ({isOwner} : {isOwner: boolean}) => {
	const [page, setPage] = useState(INITIAL_SEARCH_PARAMS.page);
	const { data, isLoading } = useGetUsersQuery({ friend: true, page }, { refetchOnMountOrArgChange: true })
	const users = data?.items

	useEffect(() => {
		console.log("Updated users data:", data?.items);
	}, [data]);
	
	const handlePageChange = useCallback((p: number) => {
		setPage(p)
	}, [])

	if (!isOwner) return <div>No friends yet...</div>
	if (isLoading) return <UsersSkeleton withoutSideBar />

	return (
		<>
			<CustomPagination
				// onChange={(p) => { setPage(p) }}
				onChange={handlePageChange}
				defaultCurrent={page}
				total={data?.totalCount}
				style={{marginBottom: '10px'}}
				size='small'
			/>

			<GridWrapper gap='5px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
				{users?.map(u => <User
					user={u}
					key={u.id}
					params={{friend: true}}
				/>)}
			</GridWrapper>
		</>

	)
}

const StyledFriends = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 5px;
	/* padding: 10px; */
`