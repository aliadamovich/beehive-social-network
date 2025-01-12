import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import { SendOutlined } from '@ant-design/icons';
import { myTheme } from "../../../styles/Theme";
import { MainButton } from "./../MainButton";

type SendMessageType = {
	messageText: string
	updateText: (message: string) => void
	addMessage: () => void
	title: string
	showCount?: boolean
	maxLength?: number
	loading: boolean
	disabled?: boolean
}

export const SendMessage = (props: SendMessageType) => {

	return (
		<StyledSendMessage>
			<StyledContent>

				<StyledMessageBody>

					<TextArea
						onChange={(e) => { props.updateText(e.currentTarget.value) }}
						value={props.messageText}
						placeholder='Write your message...'
						autoSize={{ minRows: 1, maxRows: 6 }}
						showCount={props.showCount} maxLength={props.maxLength}
						>
						
					</TextArea>
					<MainButton 
						children={props.title} 
						onClick={() => { props.addMessage() }} 
						icon={<SendOutlined />}
						loading={props.loading}
						disabled={props.disabled}
					/>
				</StyledMessageBody>

			</StyledContent>
		</StyledSendMessage>
	)
}

const StyledSendMessage = styled.div`
	position: sticky;
	bottom: 0;
	border-top: 1px solid ${myTheme.colors.borderColor};
	width: 100%;
	padding-top: 20px;
	padding-bottom: 30px;
	background-color: ${myTheme.colors.whiteBackground};
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
		padding: 10px;
	}

	@media ${myTheme.media[768]} {
			flex-direction: column;
			align-items: start;
		}
`