import React from 'react'
import { PiWechatLogoThin } from "react-icons/pi";
import styled from 'styled-components';
import { theme } from '../../../../styles/Theme';

export const EmptyDialogs = ({text}: {text: string}) => {
	return (
		<EmptyContainer>
			<PiWechatLogoThin />
			<span>{text}</span>
		</EmptyContainer>
	)
}

const EmptyContainer = styled.div`
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	/* border-top: 1px solid rgb(237, 241, 245); */
	
	gap: 20px;
	svg {
		width: 120px;
		height: 120px;
		color: ${theme.colors.accent};
	}
	span {
		font-weight: 600;
	}
`