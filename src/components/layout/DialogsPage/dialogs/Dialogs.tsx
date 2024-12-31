import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../../../redux/app/hooks";
import { useSelector } from "react-redux";
import { SingleDialog } from "./SingleDialog";
import { SendMessage } from "../../../common/sendMessageField/SendMessage";
import { DialogsType, getAllDialogsTC, sendMessageThunCreator } from "../../../../redux/reducers/dialogsReducer";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import { AppStateType } from "../../../../redux/redux-store";
import { EmptyDialogs } from "./EmptyDialogs";
import { myTheme } from "../../../../styles/Theme";
import { MainButton } from "../../../common/MainButton";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PATH } from "../../../../routes/routes";
import { AppStatusType } from "../../../../redux/reducers/appReducer";
import { MainDialogSkeleton } from "../dialogSkeletons/MainDialogSkeleton";

export const Dialogs = () => {
	const { handleBackClick } = useOutletContext<any>();
	const [messageText, setMessageText] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const messages = useSelector<AppStateType, DialogsType>(state => state.dialoPage.dialogs);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const {id} = useParams();
	const currentDialogUserId = Number(id);
	const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status);

	useEffect(() => {
		dispatch(getAllDialogsTC(currentDialogUserId))
	}, [id])

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])


	const sendMessage = () => {
		setLoading(true)
		dispatch(sendMessageThunCreator(currentDialogUserId, messageText))
			.then(() => {
				setMessageText('')
				setLoading(false)
			})
	}


	const currentDialog = messages[currentDialogUserId];

	const DialogsArray = () => {
		if (!currentDialog) return
		if (currentDialog.length === 0) {
			return <EmptyDialogs text={"start your first dialog..."}/>
		} else {
			return currentDialog.map(d => <SingleDialog
				text={d.body}
				key={d.id}
				userName={d.senderName}
				photo={null}
				fromMe={d.senderId !== currentDialogUserId}
			/>)
		}
	}

	if (appStatus === 'loading') return <MainDialogSkeleton />

	return (
		<>
			<StyledButtonContainer to={PATH.DIALOGS}>
				<MainButton type="primary" loading={false} icon={<ArrowLeftOutlined />}
					onClick={handleBackClick} />
			</StyledButtonContainer>
			<StyledMessages>
				{DialogsArray()}
				<div ref={messagesEndRef}></div>
			</StyledMessages>

			<SendMessage
				messageText={messageText}
				updateText={setMessageText}
				addMessage={sendMessage}
				title="Send"
				showCount={false}
				maxLength={3000}
				loading={loading}
			/>

		</>
	)
}


const StyledMessages = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 10px;
`


const StyledButtonContainer = styled(NavLink)`
	display: none;

	@media ${myTheme.media[950]} {
		position: sticky;
		width: 100%;
		z-index: 1000;
		top: 0%;
		left: 0%;
		background-color: #fff;
		border-radius: 8px;
		display: block;
		padding: 10px;
	}
`
