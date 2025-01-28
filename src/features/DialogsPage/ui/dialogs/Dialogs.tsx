import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { SingleDialog } from "./SingleDialog";
import { SendMessage } from "../../../../common/components/sendMessageField/SendMessage";
import { useParams } from "react-router-dom";
import { EmptyDialogs } from "./EmptyDialogs";
import { useGetMessagesWithUserQuery, useLazyGetMessagesByDateQuery, useSendMessageMutation } from "../../api/DialogsApi";
import { MainDialogSkeleton } from "./../dialogSkeletons/MainDialogSkeleton";
import { SingleDialogItem } from "features/DialogsPage/api/DialogsApi.types";
import { Divider, Typography } from "antd";
import { getDateFromISO } from "features/DialogsPage/lib/getDateFunction";
import { DialogsHeader } from "features/DialogsPage/ui/dialogs/DialogsHeader";
import { groupMessagesByDate } from "features/DialogsPage/lib/groupByDateFunc";

export const Dialogs = () => {
	const [isDateFilterActive, setIsDateFilterActive] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const {id} = useParams();
	const currentDialogUserId = Number(id);

	const { data, isLoading } = useGetMessagesWithUserQuery(currentDialogUserId)
	const [getMessagesByDate, { data: messagesByDate }] = useLazyGetMessagesByDateQuery();

	const [sendMessage, {isLoading: isMessageSendLoading}] = useSendMessageMutation()
	const messages = data?.items

	const displayedMessages = isDateFilterActive ? messagesByDate : messages;
	let sortedMessages = groupMessagesByDate(displayedMessages || [])
	let sortedDates = Object.keys(sortedMessages)

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages, messagesByDate])

	useEffect(() => {
		resetDateFilter()
	}, [currentDialogUserId])


	const datePickerChangeHandler = (date: string) => {
		setIsDateFilterActive(true);
		getMessagesByDate({ userId: Number(id), date })
	}

	const resetDateFilter = () => {
		setIsDateFilterActive(false); 
	};

	const sendMessageHandler = (message: string) => {
		return sendMessage({ userId: currentDialogUserId, message })
	}


	console.log(sortedMessages );
	console.log('sorted dates' + sortedDates);
	return (
		<>
			{ (isLoading)
			? <MainDialogSkeleton />
			: <>
					<DialogsHeader datePickerChangeHandler={datePickerChangeHandler} />
				<StyledMessages>
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


