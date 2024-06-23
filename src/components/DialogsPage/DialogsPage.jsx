import React from 'react';
import { DialogItem } from './DialogItem/DialogItem';
import c from './DialogsPage.module.scss';
import { Messages } from './Messages/Messages';
import { Search } from '../common/Search/Search';
import { Recent } from '../common/Recent/Recent';
import {Button} from './../common/Button';
import { IconsRow } from '../common/iconsrow/IconsRow';

export const DialogsPage = (props) => {
	// debugger;
	const dialogsArray = props.dialogPage.users
	.map((d, index) => <DialogItem name={d.name} id={d.id} nickname={d.username} photos={props.dialogPage.photos[index]} key={d.id}/>)
	const messagesArray = props.dialogPage.messages
	.map(m => <Messages text={m.name} photos={props.dialogPage.photos[0]} key={m.id}/>)

	return (
		<div className={c.container}>
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
						<div className={c.messageCreate}>
							
							<MessageCreate 
								msg={props.dialogPage.messages}
								newMessageText={props.dialogPage.newMessageText}
								updateText={props.updateText}
								addMessage={props.addMessage}
							/>

						</div>
					</div>
					<div className={c.body__recent}>
						<Recent />
					</div>
				</div>
			</div>
		</div>
	)
}

export const MessageCreate = (props) => {
	// debugger
	function onAddMessage() {
		props.addMessage()

	}

	function onUpdateText (e) {
		let msg = e.target.value;
		props.updateText(msg);
	}

	return (
		<div className={c.messageCreate__content}>
			<div className={c.messageCreate__body}>
				<textarea onChange={onUpdateText} value={props.newMessageText} placeholder='Write your message...'></textarea>
				<Button onClick={onAddMessage}>Send</Button>
			</div>
			<IconsRow />
		</div>
	)
}



