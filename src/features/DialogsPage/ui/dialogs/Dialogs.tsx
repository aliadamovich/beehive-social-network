import { Fragment, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { SingleDialog } from "./SingleDialog";
import { SendMessage } from "../../../../common/components/sendMessageField/SendMessage";
import { useParams } from "react-router-dom";
import { EmptyDialogs } from "./EmptyDialogs";
import { useGetMessagesWithUserQuery, useLazyGetMessagesByDateQuery, useSendMessageMutation } from "../../api/DialogsApi";
import { MainDialogSkeleton } from "./../dialogSkeletons/MainDialogSkeleton";
import { Divider, Typography } from "antd";
import { getDateFromISO } from "features/DialogsPage/lib/getDateFunction";
import { DialogsHeader } from "features/DialogsPage/ui/dialogs/DialogsHeader";
import { groupMessagesByDate } from "features/DialogsPage/lib/groupByDateFunc";

export const Dialogs = () => {
	const [isDateFilterActive, setIsDateFilterActive] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const messagesStartRef = useRef<HTMLDivElement | null>(null);
	const {id} = useParams();
	const currentDialogUserId = Number(id);

	const { data, isLoading, refetch: getAllMessages } = useGetMessagesWithUserQuery(currentDialogUserId)
	const [getMessagesByDate, { data: messagesByDate }] = useLazyGetMessagesByDateQuery();
	const messages = data?.items
	const [sendMessage, {isLoading: isMessageSendLoading}] = useSendMessageMutation()

	const displayedMessages = isDateFilterActive ? messagesByDate : messages;
	let sortedMessages = groupMessagesByDate(displayedMessages || [])
	let sortedDates = Object.keys(sortedMessages)

	useEffect(() => {
		if (isDateFilterActive && messagesStartRef.current) {
			messagesStartRef.current.scrollIntoView({ behavior: 'smooth' })
		}
		else if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages, messagesByDate])

	useEffect(() => {
		setIsDateFilterActive(false)
	}, [currentDialogUserId])

	
	const dateChangeHandler = (date: string | null) => {
		if (date) {
			setIsDateFilterActive(true);
			getMessagesByDate({ userId: Number(id), date });
		} else {
			setIsDateFilterActive(false);
			getAllMessages()
		}
	}


	const sendMessageHandler = (message: string) => {
		return sendMessage({ userId: currentDialogUserId, message })
	}
console.log(displayedMessages);
	return (
		<>
			{ (isLoading)
			? <MainDialogSkeleton />
			: <>
					<DialogsHeader dateChangeHandler={dateChangeHandler} isDateFilterActive={isDateFilterActive}/>
				<StyledMessages>
					<div ref={messagesStartRef}></div>
					{displayedMessages?.length === 0
					? <EmptyDialogs text={"start your first dialog..."} />
						: sortedDates?.map((date, i) =>
							<Fragment key={i}>
						<Divider orientation="center">
							<Typography.Text type="secondary">{getDateFromISO(date)}</Typography.Text>
						</Divider>
							{sortedMessages[date].map(d=> <SingleDialog
								key={d.id}
								message={d}
								photo={null}
								fromMe={d.senderId !== currentDialogUserId}
							/>)
							}
							</Fragment>
					)
					}
					<div ref={messagesEndRef}></div>
				</StyledMessages>
			</> 
			}

			<SendMessage
				addMessage={sendMessageHandler}
				title="Send"
				showCount={false}
				maxLength={3000}
				disabled={isLoading}
				loading={isMessageSendLoading}
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


