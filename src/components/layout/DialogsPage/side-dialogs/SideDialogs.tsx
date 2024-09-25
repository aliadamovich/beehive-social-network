import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { obtainUsers } from '../../../../redux/selectors/users-selectors'
import { SideDialogItem } from './SideDialogItem'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../../redux/app/hooks'
import { getUsersThunkCreator } from '../../../../redux/reducers/usersReducer'

export const SideDialogs = () => {

	const users = useSelector(obtainUsers);
	const dispatch = useAppDispatch();

	useEffect(() => { dispatch(getUsersThunkCreator(1, 20, true)) },[]
		//  [currentPage, usersOnPage, dispatch]
	)

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
	padding: 40px 0 40px 0px;
	border-right: 1px solid rgb(237, 241, 245);
	border-top: 1px solid rgb(237, 241, 245);
	height: calc(100vh - 120px);
	overflow: hidden;
`

const StyledDialogsBox = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 40px;
	overflow: auto;
	scrollbar-width: 0;
	&::-webkit-scrollbar {
		display: none;
	}
`
