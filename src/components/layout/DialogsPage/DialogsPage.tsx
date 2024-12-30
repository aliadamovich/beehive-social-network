import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { SideDialogs } from './side-dialogs/SideDialogs';
import { myTheme } from '../../../styles/Theme';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { AppStatusType } from '../../../redux/reducers/appReducer';

export const DialogsPage = () => {
	const [isSideDialogsVisible, setIsSideDialogsVisible] = useState(true);
	const location = useLocation();
	
	useEffect(() => {
		if (location.pathname === "/dialogs") {
			setIsSideDialogsVisible(true); 
		} else {
			setIsSideDialogsVisible(false); 
		}
	}, [location.pathname]);

	const handleDialogClick = () => setIsSideDialogsVisible(false);
	const handleBackClick = () => setIsSideDialogsVisible(true);

	// if (appStatus === 'loading') return <DialogsPageSkeleton />

	return (
		<>
			<StyledDialogPage>

				<StyledDialogPageBody>
					<StyledSideContainer isSideDialogsVisible={isSideDialogsVisible}>
						<SideDialogs onDialogClick={handleDialogClick} />
					</StyledSideContainer>
					<StyledMainDialog isSideDialogsVisible={isSideDialogsVisible}>
						<Outlet context={{ handleBackClick }} />
					</StyledMainDialog>
				</StyledDialogPageBody>

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
	height: 100%;
	overflow-y: auto;
	position: relative;
	overflow-x: hidden;
`

const StyledSideContainer = styled.div<{ isSideDialogsVisible: boolean }>`
	flex: 0 0 25%;
	border-right: 1px solid ${myTheme.colors.borderColor};
	padding: 2px 0;
	transform: translateX(0);

	@media ${myTheme.media[950]} {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		flex: 0 0 100%;
		transition: transform 0.5s ease;

		transform: ${({ isSideDialogsVisible }) =>
		isSideDialogsVisible ? 'translateX(0)' : 'translateX(-100%)'};
	}
`

const StyledMainDialog = styled.div<{ isSideDialogsVisible: boolean }>`
	overflow-y: auto;
	height: 100%;
	display: flex;
	flex-direction: column;
	/* position: relative; */
	flex: 1 1 auto;
	border-radius: 8px;
	transform: translateX(0);

	>*:not(:last-child) {
		margin-bottom: 10px;
	}
	&::-webkit-scrollbar {
		display: none;
}


@media ${myTheme.media[950]} {
	 position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		flex: 0 0 100%;
		transition: transform 0.5s ease;
		transform: ${({ isSideDialogsVisible }) =>
		isSideDialogsVisible ? 'translateX(100%)' : 'translateX(0%)'};
	}
`
