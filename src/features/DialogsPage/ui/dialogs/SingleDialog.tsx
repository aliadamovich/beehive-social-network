import styled, { css } from 'styled-components';
import { Avatar } from '../../../../common/components/Avatar';
import { myTheme } from '../../../../styles/Theme';
import { useSelector } from 'react-redux';
import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ModalWindow } from '../../../../common/components/modal/ModalWindow';
import { useDeleteMessageMutation } from 'features/DialogsPage/api/DialogsApi';
import { useAppDispatch } from 'app/hooks';

type SingleDialogPropsType = {
	text: string
	messageId: string
	userName: string
	photo: string | null
	fromMe: boolean
	dialogUserId: number
}

export const SingleDialog = (props: SingleDialogPropsType) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const [deleteMessage] = useDeleteMessageMutation()
	const confirmDeleteHandler = () => {
		// dispatch(deleteMessageTC(props.messageId, props.dialogUserId))
		deleteMessage(props.messageId)
	}
	const likeButtonClickHandler = () => {}

	return(
		<StyledMessage fromMe={props.fromMe}>
			<Avatar photo={props.photo} width={'50px'} height={'50px'} />
			<StyledTextBox fromMe={props.fromMe}>
				<StyledName>{props.userName}</StyledName>
				<p>{props.text}</p>
			</StyledTextBox>
			<StyledIconButtons>
				<IconButton onClick={() => { setIsModalOpen(true) }}>
					<CloseOutlined />
				</IconButton>
	
				<IconButton onClick={likeButtonClickHandler}>
					<HeartOutlined />
				</IconButton>
			</StyledIconButtons>
			{isModalOpen && <ModalWindow title='Delete this message?' isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} confirmHandler={confirmDeleteHandler}/>}
		</StyledMessage>
	)
}

const StyledMessage = styled.div<{ fromMe: boolean }>`
	display: flex;
	align-items: end;
	gap: 20px;
	padding: 8px 0;
	>:first-child{
		flex: 0 0 50px;
	}
	${props => props.fromMe && css<{ fromMe: boolean }>`
		flex-direction: row-reverse;
	`}
	&:hover{
		button {
			opacity: 1;
			visibility: visible;
		}
	}
	@media ${myTheme.media[576]} {
		gap: 10px;
		>:first-child{
		width: 40px;
		height: 40px;
		flex: 0 0 40px;
	}
	}
`

const StyledTextBox = styled.div<{fromMe: boolean}>`
	font-size: 16px;
	position: relative;
	box-shadow: 0px 1px 2px 0px rgba(29, 33, 38, 0.1), 0px 5px 20px 0px rgba(29, 33, 38, 0.03);
	background: rgb(245, 247, 251);
	padding: 10px;
	border-radius: 8px;

	&::before {
		content: "";
		position: absolute;
		left: -5px;
		bottom: -5px;
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-left: 10px solid rgb(245, 247, 251);
		transform: rotate(-90deg);
	}
	${props => props.fromMe && css<{fromMe: boolean}>`
		background:${myTheme.colors.accentLight};
		color: #fff;
		&::before {
		border-left: 10px solid rgb(174, 115, 230);
			left: none;
			right: -5px;
			left: unset;
		}
	`}

	@media ${myTheme.media[576]} {
		font-size: 14px;
		padding: 5px;
	}
`

const StyledName = styled.span`
	font-size: 13px;
	font-weight: 700;
	color: inherit;
	margin-bottom: 5px;
	display: inline-block;
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