import styled from 'styled-components';
import { myTheme } from '../../../../styles/Theme';
import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ModalWindow } from '../../../../common/components/modal/ModalWindow';
import { useDeleteMessageMutation } from 'features/DialogsPage/api/DialogsApi';
import { useAppDispatch } from 'app/hooks';
import { SingleDialogItem } from 'features/DialogsPage/api/DialogsApi.types';
import { getTimeFromIso } from 'features/DialogsPage/lib/getTimeFunction';
import { Dialog } from 'common/components/dialog/Dialog';

//!нет фото пользователей в диалогах

type Props = {
	message: SingleDialogItem
	fromMe: boolean
	photo: string | null
	isWS?: boolean
}

export const SingleDialog = ({message, fromMe, photo, isWS = false}: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const [deleteMessage] = useDeleteMessageMutation()

	const confirmDeleteHandler = () => {
		deleteMessage(message.id)
	}
	
	const likeButtonClickHandler = () => {}


	return(
		<StyledMessageContainer>
			{!isWS && <StyledTimeStamp>{getTimeFromIso(message.addedAt)}</StyledTimeStamp>}
			{/* <StyledMessage fromMe={fromMe}> */}
				<Dialog fromMe={fromMe} photo={photo} messageBody={message.body} sender={message.senderName}/>
				<StyledIconButtons>
					<IconButton onClick={() => { setIsModalOpen(true) }}>
						<CloseOutlined />
					</IconButton>
	
					<IconButton onClick={likeButtonClickHandler}>
						<HeartOutlined />
					</IconButton>
				</StyledIconButtons>
				{isModalOpen && <ModalWindow title='Delete this message?' isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} confirmHandler={confirmDeleteHandler}/>}
			{/* </StyledMessage> */}
		</StyledMessageContainer>
	)
}

const StyledMessageContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`

const StyledTimeStamp = styled.span`
	font-size: 11px;

`

const StyledIconButtons = styled.div`
	align-self: center;
	display: flex;
	gap: 5px;
	align-items: center;
`
const IconButton = styled.button`
	border: none;

	transition: all 0.3s ease 0s;
	opacity: 0;
	visibility: hidden;
	&:hover{
		svg{
			color: ${myTheme.colors.accent}
		}
	}
`