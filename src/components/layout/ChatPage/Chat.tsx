import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { SingleDialog } from '../DialogsPage/dialogs/SingleDialog'
import { SendMessage } from '../DialogsPage/dialogs/SendMessage'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'


// type ChatPropsType ={
// 	messages: ChatMessageType[]
// 	ws: WebSocket
// }

export type ChatMessageType = {
	userId: number
	userName: string
	message: string
	photo: string
}


export const Chat = () => {
	const [messages, setMessages] = useState<ChatMessageType[]>([])
	const [myMessageText, setMyMessageText] = useState('');
	const myUserId = useSelector<AppStateType>(state => state.auth.userId)

	const wsRef = useRef<WebSocket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	//подписываемся на событие, отслеживаем его, сетаем, но тк при перерисовке каждый раз в useEffect
	//будет попадать старый стейт, внутри usestate прописываем коллбэк - это нужно чтобы
	//при перерисовке реакт обращался не к первому значению messages а к предыдущему значению
	useEffect(() => {
		wsRef.current = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
		const ws = wsRef.current;

		const messageHandler = (e: MessageEvent) => {
			setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
		}
		ws.addEventListener('message', messageHandler)
		return () => {
			ws.removeEventListener('message', messageHandler)
			ws.close()
		}
	}, [])

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [messages])

	const updateText = (message: string) => {setMyMessageText(message)}

	const addMessage = () => {
		if (!myMessageText.trim()) return;
		wsRef.current?.send(myMessageText);
		setMyMessageText('');
	}

	const messagesArray = messages.map((m, i) => <SingleDialog
		fromMe={m.userId === myUserId}
		text={m.message}
		key={i} 
		userName={m.userName}
		photo={m.photo}
		/>)


	return (

		<StyledChat>
				<StyledChatMessages>
					
					{messagesArray}
					<div ref={messagesEndRef}></div>
				</StyledChatMessages>
				<SendMessage
					messageText={myMessageText}
					updateText={updateText}
					addMessage={addMessage}
				/>

		</StyledChat>

	)
}

const StyledChat = styled.div`
height: calc(100vh - 60px);
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

