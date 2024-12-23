import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { obtainUsers } from '../../../../redux/selectors/users-selectors'
import { SideDialogItem } from './SideDialogItem'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../redux/app/hooks'
import { getUsersThunkCreator } from '../../../../redux/reducers/usersReducer'
import { myTheme } from '../../../../styles/Theme'

export const SideDialogs = () => {

	const users = useSelector(obtainUsers);
	const dispatch = useAppDispatch();
	useEffect(() => { dispatch(getUsersThunkCreator({count: 20, page: 1, friend: true})) }, [])

	const dialogsArray = users.map(u => {
		return < SideDialogItem
		key = { u.id }
		name = { u.name }
		id = { u.id }
		photo = { u.photos.small }
			/>
	}
	)

	return (
		<StyledDialogItems>
			<StyledDialogsBox>{dialogsArray}</StyledDialogsBox>
		</StyledDialogItems>

	)
}


const StyledDialogItems = styled.div`
	flex: 0 0 25%;
	border-right: 1px solid ${myTheme.colors.borderColor};
	padding: 2px 0;

	@media ${myTheme.media[768]} {
		flex: 0 0 100%;
	}
`

const StyledDialogsBox = styled.div`
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: 15px;
	scrollbar-width: 0;
	&::-webkit-scrollbar {
		display: none;
	}
`
