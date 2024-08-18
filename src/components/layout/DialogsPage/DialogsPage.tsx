import { Search } from '../../common/Search/Search';
import { Recent } from '../../common/Recent/Recent';
import { Container } from '../../common/Container';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Dialogs } from './dialogs/Dialogs';
import { SideDialogs } from './side-dialogs/SideDialogs';

export const DialogsPage = () => {

	// 
	// useEffect(() => {
	// 	dispatch(getAllDialogsThunCreator())
	// }, [])

	return (
		<>
			<StyledDialogPage>
				<Container>
	
						<Search />
						
						<StyledDialogPageBody>
							<SideDialogs />
							<Outlet />
						</StyledDialogPageBody>

				</Container>
			</StyledDialogPage>

		</>
	)
}




const StyledDialogPage = styled.section`
	width: 100%;
	overflow: hidden;
`

const StyledDialogPageBody = styled.div`
	display: flex;
	gap: 15px;
`




