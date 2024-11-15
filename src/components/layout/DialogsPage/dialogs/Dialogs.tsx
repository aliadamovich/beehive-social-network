import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../../../redux/app/hooks";
import { useSelector } from "react-redux";
import { SingleDialog } from "./SingleDialog";
import { SendMessage } from "../../../common/sendMessageField/SendMessage";
import { DialogsType, getAllDialogsTC, sendMessageThunCreator } from "../../../../redux/reducers/dialogsReducer";
import { useParams } from "react-router-dom";
import { AppStateType } from "../../../../redux/redux-store";
import { EmptyDialogs } from "./EmptyDialogs";
import { myTheme } from "../../../../styles/Theme";

export const Dialogs = () => {

	const [messageText, setMessageText] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const messages = useSelector<AppStateType, DialogsType>(state => state.dialoPage.dialogs);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const {id} = useParams();
	const currentDialogUserId = Number(id);


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
	

	return (
			<StyledMessagesContainer>
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
			</StyledMessagesContainer>
	)
}

const StyledMessagesContainer = styled.div`
	overflow: auto;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	flex: 1 1 auto;
	border-top: 1px solid ${myTheme.colors.borderColor};
	

	>*:not(:last-child) {
		margin-bottom: 10px;
	}
	&::-webkit-scrollbar {
		display: none;
}
`

const StyledMessages = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`