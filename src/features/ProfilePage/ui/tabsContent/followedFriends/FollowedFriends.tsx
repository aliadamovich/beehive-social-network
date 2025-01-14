import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from 'app/hooks'
import {  getUsersTC, resetSearchParams, selectFollowingInProgress, selectUsers } from 'features/UserPage/model/usersSlice'
import { User } from 'features/UserPage/ui/User'
import { INITIAL_SEARCH_PARAMS, useGetUsersQuery } from 'features/UserPage/api/usersApi'
import { Pagination } from 'antd'
import { CustomPagination } from 'common/components/customPagination/CustomPagination'


export const FollowedFriends = ({isOwner} : {isOwner: boolean}) => {
	const [page, setPage] = useState(INITIAL_SEARCH_PARAMS.page);
	const {data} = useGetUsersQuery({friend: true, page})
	const users = data?.items
	const followingInProgress = useSelector(selectFollowingInProgress)


	if (!isOwner) return <div>No friends yet...</div>

	return (
		<>
			<CustomPagination
				onChange={(p) => { console.log(p); setPage(p) }}
				defaultCurrent={page}
				total={data?.totalCount}
				style={{marginBottom: '10px'}}
				size='small'
			/>

			<StyledFriends>
				{users?.map(u => <User
					u={u}
					key={u.id}
					followingInProgress={followingInProgress}
				/>)}
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