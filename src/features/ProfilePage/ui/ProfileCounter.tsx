import React from 'react'
import styled from 'styled-components'
import { myTheme } from '../../../styles/Theme'

export const ProfileCounter = () => {
	return (
		<StyledCounter>
			<Counter>
				<span>0</span>
				Friends
			</Counter>
			<Counter>
				<span>3</span>
				Groups
			</Counter>
		</StyledCounter>
	)
}

const StyledCounter = styled.div`
	display: flex;
	justify-content: center;
	gap: 25px;
	border-bottom: 1px solid ${myTheme.colors.borderColor};
	padding-bottom: 15px;
`

const Counter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 11px;
	gap: 5px;
	font-weight: 500;
	color: ${myTheme.colors.mainFontColor};
		span {
			color: ${myTheme.colors.accent};
			font-size: 20px;
			font-weight: 700;
		}
`