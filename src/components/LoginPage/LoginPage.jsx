import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '../common/Icon'
import logo from './../../assets/images/logo.png'
import { theme } from '../../styles/Theme'
import video_webm from './../../assets/images/8_webm.webm'
import video_mp4 from './../../assets/images/8.mp4'
import { LoginForm } from './LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { LoginThunkCreator } from '../../redux/reducers/authReducer'
import { Navigate } from 'react-router-dom'


export const LoginPage = () => {
	//хуки
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuth);
	useEffect(() => {
		console.log("isAuth:", isAuth); // Проверка значения isAuth
	}, [isAuth]);
	
	const onLoginHandler = ({ email, password, rememberMe }) => {
		dispatch(LoginThunkCreator(email, password, rememberMe))
	}

	if (isAuth) return <Navigate to='/profile' />

	return (
		<Login>
			<Video preload='auto' autoPlay muted loop>
				<source src={video_webm} type='video/webm'/>
				<source src={video_mp4} type='video/mp4'/>
			</Video>
			<FormContainer>
				<FormInfo>
					<LoginHeader fontSize="34px" color="#FFF">Join the club</LoginHeader>
					<LoginDescription color="#FFF">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.</LoginDescription>
					<ClubList>
						<ClubItem>
							<SvgWrapper>
							<Icon iconId='laptop' viewBox="0 0 48 48" fill='#FFF'/>
							</SvgWrapper>
							<InfoWrapper>
							<LoginHeader as='h3' fontSize='19px' color="#FFF">Community</LoginHeader>
							<LoginDescription color="#FFF">At vero eos et accusamus et.</LoginDescription>
							</InfoWrapper>
						</ClubItem>
						<ClubItem>
							<SvgWrapper>
								<Icon iconId='gal2' viewBox="0 0 26 26" fill='#FFF' />
							</SvgWrapper>
							<InfoWrapper>
								<LoginHeader as='h3' fontSize='19px' color="#FFF">Your Photo Gallery</LoginHeader>
								<LoginDescription color="#FFF">At vero eos et accusamus et.</LoginDescription>
							</InfoWrapper>
						</ClubItem>
						<ClubItem>
							<SvgWrapper>
								<Icon iconId='news2' viewBox="0 0 50 50" fill='#FFF' />
							</SvgWrapper>
							<InfoWrapper>
								<LoginHeader as='h3' fontSize='19px' color="#FFF">Latest news</LoginHeader>
								<LoginDescription color="#FFF">At vero eos et accusamus et.</LoginDescription>
							</InfoWrapper>
						</ClubItem>
					</ClubList>
				</FormInfo>
				<LoginContainer>
					<Logo src={logo} alt="" />
					<LoginHeader>Welcome</LoginHeader>
					<LoginDescription>Join gazillions of people online</LoginDescription>
					<LoginForm onLoginHandler={onLoginHandler}/>
				</LoginContainer>
			</FormContainer>
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
		z-index: 0;
	}
`

const Video = styled.video`
	position: absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	object-fit: cover;
	z-index: -1;

`

const FormContainer = styled.div`
	display: flex;
	max-width: 760px;
	width: 100%;
	position: relative;
	z-index: 3;
	justify-content: center;
`
const FormInfo = styled.div`
	flex: 0 1 50%;
	background-color: ${theme.colors.accent};
	padding: 0 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	>*:not(:last-child) {
		margin-bottom: 20px;
	}
`

const LoginHeader = styled.h2`
	font-family: 'Quicksand';
	font-weight: 700;
	font-size: ${props => props.fontSize };
	color: ${props => props.color};
`

const LoginDescription = styled.p`
	font-family: "Nunito Sans";
	font-size: 14px;
	color: ${props => props.color};
`
const ClubList = styled.ul`
>*:not(:last-child) {
	margin-bottom: 25px;
}`

const ClubItem = styled.li`
	display: flex;
	align-items: center;
	gap: 15px;
`

const SvgWrapper = styled.div`
	width: 40px;
	height: 40px;
	border: 1px solid #FFF;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 30px;
		height: 30px;
	}
`

const InfoWrapper = styled.div`
`

const LoginContainer = styled.div`
	flex: 0 1 50%;
	background-color: #fff;
	text-align: center;
	padding: 80px 40px;
	>*:not(:last-child) {
		margin-bottom: 20px;
	}
`
const Logo = styled.img`
	width: 60px;
	height: 60px;
`

