import { Button, ButtonProps } from 'antd'
import React, { ButtonHTMLAttributes } from 'react'
import { useSelector } from 'react-redux';
import { myTheme } from '../../styles/Theme';
import styled from 'styled-components';
import { selectStatus } from 'app/appSlice';

type MainButtonPropsType = ButtonProps & {
	icon?: React.ReactNode
	loading : boolean
}

export const MainButton = ({ children, icon, type, loading, disabled, ...props }: MainButtonPropsType ) => {
	const appStatus = useSelector(selectStatus);


	return (
		<StyledButton
			type="primary"
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
		opacity: 0.8
	}
`