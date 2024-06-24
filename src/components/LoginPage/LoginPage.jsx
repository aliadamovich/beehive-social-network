import React from 'react'
import styled from 'styled-components'
import { Icon } from '../common/Icon'
import logo from './../../assets/images/logo.png'
import { Button } from '../common/Button'
import { theme } from '../../styles/Theme'
import key from './../../assets/images/key.svg'
import user from './../../assets/images/userSvg.svg'
import video_webm from './../../assets/images/8_webm.webm'
import video_mp4 from './../../assets/images/8.mp4'
export const LoginPage = () => {
	return (
		<Login>
			<Video preload='auto' autoPlay muted loop>
				<source src={video_webm} type='video/webm'/>
				<source src={video_mp4} type='video/mp4'/>
			</Video>
			<FormContainer>
				<FormInfo>
					<LoginHeader fontSize="34x" color="#FFF">Join the club</LoginHeader>
					<LoginDescription color="#FFF">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.</LoginDescription>
					<ClubList>
						<ClubItem>
							<SvgWrapper>
							<Icon iconId='laptop'  viewBox="0 0 48 48" fill='#FFF'/>
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
					<Form>
						<FieldWrappper>
							<span></span>
							<Field height='40px' type="text" placeholder='Email or username'/>
						</FieldWrappper>
						<FieldWrappper>
							<span></span>
							<Field height='40px' type="password" placeholder='Password' id='password'/>
						</FieldWrappper>
						<LinksWrapper>
							<CheckboxWrapper>
								<Checkbox id='checkbox' type="checkbox" placeholder='Password'/>
								<label htmlFor="checkbox">Remember</label>
							</CheckboxWrapper>
							<a href="#">Lost Password?</a>
						</LinksWrapper>
						<Button>Log into your account</Button>
					</Form>
				</LoginContainer>
			</FormContainer>
		</Login>
	)
}

const Login = styled.div`
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
	padding: 80px 40px;
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
	margin-bottom: 12px;
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

const Form = styled.form`
	display: flex;
	flex-direction: column;
`

const FieldWrappper = styled.div`
	position: relative;
	margin-bottom: 12px;
	span {
		display: inline-block;
		width: 38px;
		height: 38px;
		padding: 10px;
		background: #ffffff url(${user}) center/20px no-repeat;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 2px;
		z-index: 2;
	}
	&:nth-child(2){
		span {
			background: #ffffff url(${key}) center/20px no-repeat;
		}
	}


`

const Field = styled.input`
	position: relative;
	background-color: rgb(247, 247, 247);
	border-radius: 20px;
	padding-left: 50px;
	width: 100%;
	height: ${props => props.height};
	&::placeholder {
		font-size: 14px;
		color: rgb(98, 108, 114);
	}
`

const LinksWrapper = styled.div`
	display: flex;
	justify-content: space-between;
		label {
		display: inline-block;
		font-size: 13px;
	}
	a {
		font-size: 13px;
		color: #111010;
		&:hover{
			color: #8c30e2;
		}
	}
`

const CheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
`
const Checkbox = styled.input`
	height: 18px;
	width: 18px;
`
