import { MainButton } from 'common/components/MainButton'
import { useStartDialogWithUserMutation } from 'features/DialogsPage/api/DialogsApi'
import { NavLink, useParams } from 'react-router-dom'
import { PATH } from 'routes/routes'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'

export const ActionButtons = () => {
	const {userId} = useParams();
	console.log(userId);
	const [startDialog] = useStartDialogWithUserMutation()
	const startDialogHandler = () => {
		startDialog(Number(userId))
	}
	return (
		<>
			<StyledButtons>
				<NavLink to={`${PATH.DIALOGS}/${userId}`}>
					<span>
						<MainButton children='Start dialog' loading={false} onClick={startDialogHandler}/>
					</span>
				</NavLink>
				
				{/* {user && <FollowUserButton user={user} params={{}} />} */}
			</StyledButtons>
		</>
	)
}

const StyledButtons = styled.div`
display: flex;
	flex-direction: column;
	gap: 10px;

	@media ${myTheme.media[950]} {
		flex: 0 0 300px;
		padding: 0 20px;
	}

	@media ${myTheme.media[768]} {
		flex: 1 1 auto;
		flex-direction: row;
	}
`