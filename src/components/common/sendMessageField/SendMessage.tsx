import styled from "styled-components";
import { Button } from "../Button"
import { IconsRow } from "../iconsrow/IconsRow"
import { useAppDispatch } from "../../../redux/app/hooks";
import { sendMessageThunCreator } from "../../../redux/reducers/dialogsReducer";
import TextArea from "antd/es/input/TextArea";

type SendMessageType = {
	messageText: string
	updateText: (message: string) => void
	addMessage: () => void
}

export const SendMessage = (props: SendMessageType) => {

	return (
		<StyledSendMessage>
			<StyledContent>

				<StyledMessageBody>

					<TextArea
						onChange={(e) => { props.updateText(e.currentTarget.value) }}
						value={props.messageText}
						placeholder='Write your message...'>
					</TextArea>

					<Button onClick={() => { props.addMessage() }} >Send</Button>

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