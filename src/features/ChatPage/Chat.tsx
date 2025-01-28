import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SingleDialog } from 'features/DialogsPage/ui/dialogs/SingleDialog'
import { SendMessage } from 'common/components/sendMessageField/SendMessage'
import { selectAuthorizedLoginId } from 'features/LoginPage/model/authSlice'

export type ChatMessageType = {
	userId: number
	userName: string
	message: string
	photo: string
}


export const Chat = () => {
	const [messages, setMessages] = useState<ChatMessageType[]>([])
	const [myMessageText, setMyMessageText] = useState('');
	const myUserId = useSelector(selectAuthorizedLoginId)
	const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');
	const wsRef = useRef<WebSocket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const [waitingToReconnect, setWaitingToReconnect] = useState(null);

	useEffect(() => {
		let ws: WebSocket;
		let reconnectTimeout: NodeJS.Timeout;
		const createChannel = () => {

			if (wsRef.current) {
				wsRef.current.removeEventListener('close', closeHandler);
				wsRef.current.removeEventListener('message', messageHandler);
				wsRef.current.removeEventListener('open', openHandler);
				wsRef.current.close();
			}
			ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
			wsRef.current = ws;
			setReadyStatus('ready')
			ws.addEventListener('open', openHandler)
			ws.addEventListener('message', messageHandler)
			ws.addEventListener('close', closeHandler)
		}


		function messageHandler(e: MessageEvent) {
			setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
		}
		function openHandler() {
			console.log('ws connected');
			setReadyStatus('ready')
		}
		function closeHandler() {
			console.log('ws channel closed');
			setReadyStatus('pending')
			reconnectTimeout = setTimeout(createChannel, 3000);
		}

		createChannel();
		
		return () => {
			clearTimeout(reconnectTimeout);
			ws.removeEventListener('open', openHandler)
			ws.removeEventListener('message', messageHandler)
			ws.removeEventListener('close', closeHandler)
			ws.close()
		}
	}, [])

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [messages])

	const updateText = (message: string) => {setMyMessageText(message)}

	const addMessage = (message: string) => {
		// if (!myMessageText.trim()) return;
		wsRef.current?.send(message);
		// setMyMessageText('');
	}

	const messagesArray = messages.map((m, i) => <SingleDialog
		fromMe={m.userId === myUserId}
		text={m.message}
		key={i}
		userName={m.userName}
		photo={m.photo}
		dialogUserId={0}
		messageId=''
	/>)


	return (

		<StyledChat>
			<StyledChatMessages>

				{messagesArray}
				<div ref={messagesEndRef}></div>
			</StyledChatMessages>
			<SendMessage
				loading={false}
				title='Send Message'
				// messageText={myMessageText}
				// updateText={updateText}
				addMessage={addMessage}
				disabled={readyStatus === 'pending'}
			/>
		</StyledChat>

	)
}

const StyledChat = styled.div`
height: calc(100vh - var(--header-height) - var(--content-margin) - var(--footer-height));
overflow: hidden;
position: relative;
display: flex;
flex-direction: column;
`
const StyledChatMessages = styled.div`
	flex: 1 1 auto;
	overflow-y: auto;
	padding: 20px;
`

