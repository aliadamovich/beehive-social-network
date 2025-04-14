import styled from 'styled-components'
import logo from './../../../assets/images/logo.png'
import { LoginForm } from './LoginForm'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { myTheme } from '../../../styles/Theme'
import { ErrorBanner } from 'common/components/ErrorBanner'
import { selectIsAuth } from 'features/LoginPage/model/authSlice'
import { PATH } from 'routes/routes'
import { LoginContentInformation } from 'features/LoginPage/ui/LoginContentInformation'
import { BackgroundVideo } from 'features/LoginPage/ui/BackgroundVideo'

export type SubmittedValueType = {
	email: string
	password: string
	rememberMe: boolean
}

export const LoginPage = () => {
	const isAuth = useSelector(selectIsAuth);

	if (isAuth) return <Navigate to={PATH.PROFILE} />

	return (
		
		<Login>
			<BackgroundVideo />
			<FormContainer>
				<LoginContentInformation />
				<LoginContainer>
					<Logo src={logo} alt="" />
					<LoginHeader>Welcome</LoginHeader>
					{/* <LoginDescription>Join gazillions of people online</LoginDescription> */}
					<Disclaimer>
						To login use common test account credentials:
						<p><b>Email: </b>adamovich.dev@gmail.com</p>
						<p><b>Password:</b> Pass123</p>
					</Disclaimer>
					<LoginForm />
				</LoginContainer>
			</FormContainer>
			<ErrorBanner />
		</Login>
	)
}

const Login = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	&::before{
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.638);
		z-index: 2;
	}
`

const FormContainer = styled.div`
	display: flex;
	max-width: 760px;
	width: 100%;
	position: relative;
	z-index: 3;
	justify-content: center;

	@media ${myTheme.media[768]} {
		max-width: 365px;
		padding: 0 10px;
	}
`

export const LoginHeader = styled.h2<{fontSize?: string}>`
	font-family: 'Quicksand';
	font-weight: 700;
	font-size: ${props => props.fontSize };
	color: ${props => props.color};
`

export const LoginDescription = styled.p`
	font-family: "Nunito Sans";
	font-size: 14px;
	color: ${props => props.color};
`
const Disclaimer = styled.div`
	p {
		margin-top: 5px;
	}
`

const LoginContainer = styled.div`
	flex: 0 1 50%;
	background-color: #fff;
	text-align: center;
	padding: 80px 40px;
	>*:not(:last-child) {
		margin-bottom: 20px;
	}

	@media ${myTheme.media[768]} {
		flex: 1 1 100%;
	}
`
const Logo = styled.img`
	width: 60px;
	height: 60px;
`

