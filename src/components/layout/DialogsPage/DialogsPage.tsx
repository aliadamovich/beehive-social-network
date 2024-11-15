import { Search } from '../../common/Search/Search';
import { Container } from '../../common/Container';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { SideDialogs } from './side-dialogs/SideDialogs';

export const DialogsPage = () => {

	return (
		<>
			<StyledDialogPage>
				{/* <Container> */}
	
						<Search />
						
						<StyledDialogPageBody>
							<SideDialogs />
							<Outlet />
						</StyledDialogPageBody>

				{/* </Container> */}
			</StyledDialogPage>

		</>
	)
}




const StyledDialogPage = styled.section`
	width: 100%;
	overflow: hidden;
	max-width: 1110px;
	margin: 0px auto;
	height: calc(100vh - var(--header-height) - var(--content-margin) - var(--footer-height) );
`

const StyledDialogPageBody = styled.div`
	display: flex;
	gap: 15px;
	height: calc(100% - 60px);
	overflow: auto;
`




