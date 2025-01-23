import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { SideDialogsSkeleton } from '../dialogSkeletons/SideDialogsSkeleton'
import { selectStatus } from '../../../../app/appSlice'
import { SideDialogItem } from './SideDialogItem'
import { useGetAllMessagesQuery } from 'features/DialogsPage/api/DialogsApi'


type Props = {
	onDialogClick: () => void
}

export const SideDialogs = ({ onDialogClick }: Props) => {
	const { data: messages, isLoading } = useGetAllMessagesQuery()
	const appStatus = useSelector(selectStatus);


	if (isLoading) return <SideDialogsSkeleton />


	return (
		<StyledDialogsBox>
			{messages?.map(u => {
				return < SideDialogItem
					key={u.id}
					name={u.userName}
					id={u.id}
					photo={u.photos.small}
					onDialogClick={onDialogClick}
				/>})
			}
		</StyledDialogsBox>
	)
}


// const StyledDialogItems = styled.div<{ isSideDialogsVisible: boolean }>`
// 	flex: 0 0 25%;
// 	border-right: 1px solid ${myTheme.colors.borderColor};
// 	padding: 2px 0;
// 	transform: translateX(0);

// 	@media ${myTheme.media[950]} {
// 		flex: 0 0 100%;
// 		transition: transform 0.3s ease;
// 		transform: ${({ isSideDialogsVisible }) =>
// 		isSideDialogsVisible ? 'translateX(0)' : 'translateX(-100%)'};
// 	}
// `

const StyledDialogsBox = styled.div`
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 10px 0;
	scrollbar-width: 0;
	&::-webkit-scrollbar {
		display: none;
	}
`
