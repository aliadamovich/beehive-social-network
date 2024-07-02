import styled from "styled-components"
import { theme } from "../../styles/Theme"

const Header = styled.header`
	position: fixed;
	height: 60px;
	width: 100%;
	z-index: 1000;
	top: 0;
`

const HeaderContainer = styled.div`
	background: #ffffff;
	border-bottom: 1px solid rgb(237, 241, 245);
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 80px;
`

const HeaderSearch = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	cursor: pointer;

	input {
		padding: 5px;
		border-radius: 5px;
		min-width: 300px;
		border: none;
		cursor: pointer;
	}

	svg {
		width: 18px;
		height: 18px;
	}
`
const UserData = styled.div`
	display: flex;
	align-items: center;
	gap: 50px;

	svg{
		width: 20px;
		height: 20px;
		transition: all 0.3s ease 0s;
		stroke: ${theme.colors.boldFont}
	}
`
const UserName = styled.span`
	font-size: 16px;
	line-height: 1;
	font-weight: 600;
`
const LogOutButton = styled.button`
	display: flex;
	align-items: center;
	gap: 5px;
	font-size: 14px;
	border: none;
	color: ${theme.colors.boldFont};
	transition: all 0.3s ease 0s;

	&:hover{
		color: ${theme.colors.accent};
		svg {
			stroke: ${theme.colors.accent};
		}
	}

`

const HeaderLogin = styled.div`
	width: 100%;
	height: 80px;
	max-width: 1140px;
	padding: 0 20px;
	margin: 0px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	>a:nth-child(2) {
		color: #fff;
		font-size: 16px;
		font-weight: 500;
	}

	img {
		width: 155px;
		height: 45px;
	}
`

export const S = {
	Header,
	HeaderContainer,
	HeaderSearch,
	UserData,
	UserName,
	LogOutButton,
	HeaderLogin
}