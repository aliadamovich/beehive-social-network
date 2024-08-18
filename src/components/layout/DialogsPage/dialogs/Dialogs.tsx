import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../../../redux/app/hooks";
import { useSelector } from "react-redux";
import { getMessages } from "../../../../redux/selectors/dialogs-selectors";
import { SingleDialog } from "./SingleDialog";
import { SendMessage } from "./SendMessage";
import { sendNewMessageActionCreator, updateNewMessageTextActionCreator } from "../../../../redux/reducers/dialogsReducer";
import { EmptyDialogs } from "./EmptyDialogs";
import { useParams } from "react-router-dom";

export const Dialogs = () => {

	const [messageText, setMessageText] = useState('')
	const dispatch = useAppDispatch();
	const messages = useSelector(getMessages);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const {id} = useParams();

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	const updateText = (message: string) => {
		setMessageText(message)
		dispatch(updateNewMessageTextActionCreator(message))
	}

	const addMessage = () => {
		dispatch(sendNewMessageActionCreator())
		setMessageText('')
	}

	const messagesArray = messages.map(m => <SingleDialog
		text={m.body}
		key={m.id}
		userName={m.email}
		photo={null}
	/>)

	return (
			<StyledMessages>
				{messagesArray}
				<div ref={messagesEndRef}></div>
	
				<SendMessage
					messageText={messageText}
					updateText={updateText}
					addMessage={addMessage}
				/>
			</StyledMessages>
	)
}

const StyledMessages = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	flex: 1 1 auto;
	padding: 40px 40px 0 40px;
	/* border-right: 1px solid rgb(237, 241, 245); */
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
