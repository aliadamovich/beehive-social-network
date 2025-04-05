import { Button, ButtonProps } from 'antd'
import React, { ButtonHTMLAttributes, ComponentProps } from 'react'
import { useSelector } from 'react-redux';
import { myTheme } from '../../styles/Theme';
import styled from 'styled-components';
import { selectStatus } from 'app/appSlice';

type MainButtonPropsType = ButtonProps & {
	icon?: React.ReactNode
	loading?: boolean
	htmlType?: "submit" | "reset" | "button"
}

export const MainButton = ({ children, icon, type, loading, disabled, htmlType = 'button',...props }: MainButtonPropsType ) => {

	return (
		<StyledButton
			type='primary'
			htmlType={htmlType}
			icon={icon}
			loading={loading}
			name='Logout'
			disabled={disabled}
			{...props}
		>{children}
		</StyledButton>
	)
}

const StyledButton = styled(Button)`
	background-color: ${ myTheme.colors.accentLight };
	transition: all 0.3s ease 0s;
	flex-direction: row-reverse;
	&:hover{
		background-color: ${ myTheme.colors.accentLight } !important;
		opacity: 0.8;
	}
	&:disabled {
		 &:hover{
			background-color: rgba(0, 0, 0, 0.04) !important;
		 }
	}
`