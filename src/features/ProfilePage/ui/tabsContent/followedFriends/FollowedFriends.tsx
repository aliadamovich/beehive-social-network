import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { User } from 'features/UserPage/ui/User'
import { INITIAL_SEARCH_PARAMS, useGetUsersQuery, useLazyGetUsersQuery } from 'features/UserPage/api/usersApi'
import { CustomPagination } from 'common/components/customPagination/CustomPagination'
import { GridWrapper } from 'common/components/GridWrapper'
import { UsersSkeleton } from 'features/UserPage/ui/UsersSkeleton'

//!ОШИБКА ПРИ ПЕРЕЛИСТЫВАНИИ СТРАНИЦ - В КЭШ ДОБАЛЯЮТСЯ НОВЫЕ ЮЗЕРЫ А НЕ ЗАМЕЩАЮТСЯ НОВЫМИ ИЗЗА merge

export const FollowedFriends = ({isOwner} : {isOwner: boolean}) => {
	const [page, setPage] = useState(INITIAL_SEARCH_PARAMS.page);
	const { data, isLoading, isFetching } = useGetUsersQuery({ friend: true, page, count: 6 })
	const users = data?.items

	if (!isOwner) return <div>No friends yet...</div>

	return (
		<>
			<CustomPagination
				onChange={(p) => { setPage(p) }}
				defaultCurrent={page}
				total={data?.totalCount}
				style={{marginBottom: '10px'}}
				size='small'
			/>
			{isLoading || isFetching
				? <UsersSkeleton withoutSideBar />
				: <GridWrapper gap='5px' gtc='repeat(auto-fit, minmax(250px, 1fr))' style={{paddingBottom: '20px'}}>
					{users?.map(u => <User
						user={u}
						key={u.id}
						params={{friend: true}}
					/>)}
				</GridWrapper>
			}
		</>

	)
}
