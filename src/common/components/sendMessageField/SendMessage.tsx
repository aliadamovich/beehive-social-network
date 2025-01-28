import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import { SendOutlined } from '@ant-design/icons';
import { myTheme } from "../../../styles/Theme";
import { MainButton } from "./../MainButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type Props = {
	addMessage: (message: string) => Promise<any> | void
	title: string
	showCount?: boolean
	maxLength?: number
	loading: boolean
	disabled?: boolean
}

export const SendMessage = (props: Props) => {
	const [inputValue, setInputValue] = useState<string>("")

	const keyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			addMessageHandler()
		}
	}
	const changeInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.currentTarget.value)
	}

	const addMessageHandler = () => {
		if (inputValue.trim()) {
			const result = props.addMessage(inputValue.trim());
			if (result instanceof Promise) {
				result.then(() => setInputValue("")); 
			} else {
				setInputValue("");
			}
		}
	}

	return (
		<StyledSendMessage>
			<StyledContent>

				<StyledMessageBody>

					<TextArea
						onChange={changeInputHandler}
						value={inputValue}
						placeholder='Write your message...'
						autoSize={{ minRows: 1, maxRows: 6 }}
						onKeyDown={keyPressHandler}
						showCount={props.showCount} maxLength={props.maxLength}
						>
						
					</TextArea>
					<MainButton 
						children={props.title} 
						onClick={addMessageHandler }
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