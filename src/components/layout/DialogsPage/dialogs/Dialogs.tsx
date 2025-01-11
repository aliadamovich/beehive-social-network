import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../../../redux/app/hooks";
import { useSelector } from "react-redux";
import { SingleDialog } from "./SingleDialog";
import { SendMessage } from "../../../common/sendMessageField/SendMessage";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import { EmptyDialogs } from "./EmptyDialogs";
import { myTheme } from "../../../../styles/Theme";
import { MainButton } from "../../../common/MainButton";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PATH } from "../../../../routes/routes";
import { MainDialogSkeleton } from "../dialogSkeletons/MainDialogSkeleton";
import { sendMessageThunCreator } from "../../../../redux/reducers/dialogsSlice";
import { selectStatus } from "../../../../redux/reducers/appSlice";
import { useGetAllMessagesQuery } from "../../../../apiDal/DialogsApi";

export const Dialogs = () => {
	const { handleBackClick } = useOutletContext<any>();
	const [messageText, setMessageText] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	// const messages = useSelector(selectDialogs);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const {id} = useParams();
	const currentDialogUserId = Number(id);
	const appStatus = useSelector(selectStatus);

	// useEffect(() => {
	// 	dispatch(getAllDialogsTC(currentDialogUserId))
	// }, [id])

	const { data } = useGetAllMessagesQuery(currentDialogUserId)
	const messages = data?.items

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


	const mapDialogs = () => {
		if (messages?.length === 0) {
			return <EmptyDialogs text={"start your first dialog..."}/>
		} else {
			return messages?.map(d => <SingleDialog
				text={d.body}
				messageId={d.id}
				dialogUserId={currentDialogUserId}
				key={d.id}
				userName={d.senderName}
				photo={null}
				fromMe={d.senderId !== currentDialogUserId}
			/>)
		}
	}

	if (appStatus === 'loading') return <MainDialogSkeleton />

	return (
		<>
			<StyledButtonContainer to={PATH.DIALOGS}>
				<MainButton type="primary" loading={false} icon={<ArrowLeftOutlined />}
					onClick={handleBackClick} />
			</StyledButtonContainer>
			<StyledMessages>
				{mapDialogs()}
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
		</>
	)
}


const StyledMessages = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 10px;
`


const StyledButtonContainer = styled(NavLink)`
	display: none;

	@media ${myTheme.media[950]} {
		position: sticky;
		width: 100%;
		z-index: 1000;
		top: 0%;
		left: 0%;
		background-color: #fff;
		border-radius: 8px;
		display: block;
		padding: 10px;
	}
`
