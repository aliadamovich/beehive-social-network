import { useEffect, useRef, useState } from 'react';
import { DialogItem } from './Messages/DialogItem';
import { Messages } from './Messages/Messages';
import { Search } from '../common/Search/Search';
import { Recent } from '../common/Recent/Recent';
import { Container } from '../common/Container';
import { useAppDispatch } from '../../redux/app/hooks';
import { sendNewMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/reducers/dialogsReducer';
import { useSelector } from 'react-redux';
import { obtainUsers } from '../../redux/selectors/users-selectors';
import { getUsersThunkCreator } from '../../redux/reducers/usersReducer';
import { getMessages } from '../../redux/selectors/dialogs-selectors';
import { SendMessage } from './Messages/SendMessage';
import styled from 'styled-components';

export const DialogsPage = () => {

	const [messageText, setMessageText] = useState('')
	const dispatch = useAppDispatch();
	const users = useSelector(obtainUsers)
	const messages = useSelector(getMessages);

	const messagesEndRef = useRef<HTMLDivElement | null> (null);

	useEffect(() => { dispatch(getUsersThunkCreator(1, 20, true)) },[]
		// [currentPage, usersOnPage, dispatch]
	)

	// useEffect(() => {
	// 	dispatch(getAllDialogsThunCreator())
	// }, [])

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

	const dialogsArray = users.map(u => <DialogItem 
												key={u.id}
												name={u.name} 
												id={u.id} 
												photo={u.photos.small} 
											 />)

	const messagesArray = messages.map(m => <Messages 
												text={m.body} 
												key={m.id} 
												userName={m.email}
												photo={null}
												/>)


	return (
		<StyledDialogPage>
			<Container>

					<Search />
					
					<StyledDialogPageBody>

						<StyledDialogItems>
							{dialogsArray}
						</StyledDialogItems>

						<StyledMessages>
								{messagesArray}
								<div ref={messagesEndRef}></div>
								
							<SendMessage 
								messageText={messageText}
								updateText={updateText}
								addMessage={addMessage}
							/>
						</StyledMessages>

						<Recent />

					</StyledDialogPageBody>
			</Container>
		</StyledDialogPage>
	)
}




const StyledDialogPage = styled.section`
	width: 100%;
	overflow: hidden;
`

const StyledDialogPageBody = styled.div`
	display: flex;
	gap: 15px;
	>div:nth-child(3) {
		flex: 0 0 22%;
	}
`

const StyledDialogItems = styled.div`
	flex: 0 0 22%;
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 40px 0 0 0px;
	border-right: 1px solid rgb(237, 241, 245);
	border-top: 1px solid rgb(237, 241, 245);
	height: calc(100vh - 120px);
	overflow: scroll;
	scrollbar-width: 0;
	&::-webkit-scrollbar {
		display: none;
	}
`

const StyledMessages = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	flex: 1 1 auto;
	padding: 40px 40px 0 40px;
	border-right: 1px solid rgb(237, 241, 245);
	border-top: 1px solid rgb(237, 241, 245);
	height: calc(100vh - 120px);
	overflow: scroll;
		flex: 1 1 auto;

	>*:not(:last-child) {
		margin-bottom: 10px;
	}

	&::-webkit-scrollbar {
		display: none;
}
`