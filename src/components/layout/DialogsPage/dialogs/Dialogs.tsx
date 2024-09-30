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

export const Dialogs = () => {

	const [messageText, setMessageText] = useState('')
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
		dispatch(sendMessageThunCreator(currentDialogUserId, messageText))
			.then(() => setMessageText(''))
	}

	const currentDialog = messages[currentDialogUserId];

	const DialogsArray = () => {
		if (!currentDialog) return
		if (currentDialog.length === 0) {
			// return <div>Start your first dialog...</div>
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
	
	
	// const messagesArray = currentDialog?.map(d => <SingleDialog
	// 	text={d.body}
	// 	key={d.id}
	// 	userName={d.senderName}
	// 	photo={null}
	// 	fromMe={d.senderId !== currentDialogUserId}
	// />)

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
				/>
			</StyledMessagesContainer>
	)
}

const StyledMessagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	flex: 1 1 auto;
	padding: 40px 40px 0 40px;
	border-top: 1px solid rgb(237, 241, 245);
	height: calc(100vh - 120px);
	overflow: scroll;

	>*:not(:last-child) {
		margin-bottom: 10px;
	}

	&::-webkit-scrollbar {
		display: none;
}
`

const StyledMessages = styled.div`
	flex: 1 1 auto;
`