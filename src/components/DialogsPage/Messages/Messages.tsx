import styled from 'styled-components';
import { Avatar } from '../../common/Avatar';

type MessagesPropsType = {
	text: string
	userName: string
	photo: string | null
}

export const Messages = (props: MessagesPropsType) => {

	return(
		<StyledMessage>
			<Avatar photo={props.photo}/>
			<StyledTextBox>
				<StyledName>{props.userName}</StyledName>
				<p>{props.text}</p>
			</StyledTextBox>
		</StyledMessage>
	)
}

const StyledMessage = styled.div`
	display: flex;
	align-items: center;
	gap: 25px;
	padding: 8px 0;
	>:first-child{
		flex: 0 0 35px;
	}
`

const StyledTextBox = styled.div`
	font-size: 16px;
	position: relative;
	// border: 1px solid rgb(129, 29, 222);
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
`

const StyledName = styled.span`
	font-size: 13px;
	font-weight: 700;
	color: rgb(79, 81, 91);
	margin-bottom: 5px;
	display: inline-block;
`