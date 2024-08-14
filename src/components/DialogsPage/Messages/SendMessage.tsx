import styled from "styled-components";
import { Button } from "../../common/Button"
import { IconsRow } from "../../common/iconsrow/IconsRow"

type SendMessageType = {
	messageText: string
	updateText: (message: string) => void
	addMessage: () => void
}

export const SendMessage = (props: SendMessageType) => {

	// const dispatch = useAppDispatch()
	// const onGetDialogs = () => {
	// 	dispatch(startDialogThunCreator(31278))
	// }

	// const onAddMessage = () => {
	// 	dispatch(sendMessageThunCreator(31278, 'this is my first message'))
	// }

	return (
		<StyledSendMessage>
			<StyledContent>

				<StyledMessageBody>

					<textarea
						onChange={(e) => { props.updateText(e.currentTarget.value) }}
						value={props.messageText}
						placeholder='Write your message...'>
					</textarea>

					<Button onClick={() => { props.addMessage() }}>Send</Button>
					{/* <button onClick={onGetDialogs}>get dialogs</button> */}
					
				</StyledMessageBody>

				<IconsRow />
			</StyledContent>
		</StyledSendMessage>
	)
}

const StyledSendMessage = styled.div`
	position: sticky;
	bottom: 0;
	border-top: 1px solid rgb(237, 241, 245);
	background: #fff;
	width: 100%;
	padding-top: 20px;
	padding-bottom: 30px;
`
const StyledContent = styled.div`
	padding: 0 20px;
`
const StyledMessageBody = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 8px;
	textarea {
		resize: none;
		width: 100%;
		border: 1px solid rgb(129, 29, 222);
		padding: 10px;
		border-radius: 8px;
	}
`