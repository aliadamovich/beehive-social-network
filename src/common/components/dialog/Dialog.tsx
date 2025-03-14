import { Avatar } from 'common/components/Avatar'
import React from 'react'
import styled, { css } from 'styled-components'
import { myTheme } from 'styles/Theme'

type Props = {
	fromMe: boolean
	photo: string | null
	messageBody: string
	sender: string
}

export const Dialog = ({ fromMe, photo,messageBody, sender }: Props) => {
	return (
		<StyledMessage fromMe={fromMe}>
		<Avatar photo={photo} width={'50px'} height={'50px'} />
		<StyledTextBox fromMe={fromMe}>
			<StyledName>{sender}</StyledName>
				<p>{messageBody}</p>
		</StyledTextBox>
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

const StyledTextBox = styled.div<{ fromMe: boolean }>`
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
	${props => props.fromMe && css<{ fromMe: boolean }>`
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