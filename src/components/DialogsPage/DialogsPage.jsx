import { useEffect, useState } from 'react';
import { DialogItem } from './DialogItem/DialogItem';
import c from './DialogsPage.module.scss';
import { Messages } from './Messages/Messages';
import { Search } from '../common/Search/Search';
import { Recent } from '../common/Recent/Recent';
import {Button} from './../common/Button';
import { IconsRow } from '../common/iconsrow/IconsRow';
import { Container } from '../common/Container';
import { useAppDispatch } from '../../redux/app/hooks';
import { sendNewMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/reducers/dialogsReducer';
import { useSelector } from 'react-redux';
import { obtainUsers } from '../../redux/selectors/users-selectors';
import { getUsersThunkCreator } from '../../redux/reducers/usersReducer';
import { getMessages } from '../../redux/selectors/dialogs-selectors';
import { SendMessage } from './Messages/SendMessage';

export const DialogsPage = (props) => {

	const [messageText, setMessageText] = useState('')
	const dispatch = useAppDispatch();
	const users = useSelector(obtainUsers)
	const messages = useSelector(getMessages)

	useEffect(() => { dispatch(getUsersThunkCreator(1, 10, true)) },[]
		// [currentPage, usersOnPage, dispatch]
	)

	// useEffect(() => {
	// 	dispatch(getAllDialogsThunCreator())
	// }, [])


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


	const updateText = (message) => {
		setMessageText(message)
		dispatch(updateNewMessageTextActionCreator(message))
	}

	const addMessage = () => {
		dispatch(sendNewMessageActionCreator())
	}

	return (
		<div className={c.dialogs}>
			<Container>
				<div className={c.content}>
	
					<Search />
					
					<div className={c.body}>
						<div className={c.body__dialogs}>
	
							{dialogsArray}
	
						</div>
						<div className={c.body__messages}>
							<div className={c.body__content}>
								{messagesArray}
							</div>
								
								<SendMessage 
									messageText={messageText}
									updateText={updateText}
									addMessage={addMessage}
								/>
	
						</div>
						<Recent />
					</div>
				</div>
			</Container>
		</div>
	)
}





