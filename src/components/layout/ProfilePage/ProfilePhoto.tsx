import styled from 'styled-components';
import null_user from './../../../assets/images/user.png';
import { ProfileType } from '../../../types/types';

type ProfilePhotoType = {
	userProfile: ProfileType
	onPhotoChoose: () => void
	isOwner: boolean
}

export const ProfilePhoto = (props: ProfilePhotoType) => {
	return (
		<>
			<UserStyledPhoto>
				{
					props.userProfile.photos.large !== null ?
						<img src={props.userProfile.photos.large} alt="user" /> :
						<img src={null_user} alt="user" />
				}
				{props.isOwner &&
					<>
						<AddPhotoInput id='file' onChange={props.onPhotoChoose} type={'file'} />
						<label htmlFor="file">+</label>
					</>
				}
			</UserStyledPhoto>

			<ProfileUserName>{props.userProfile.fullName}</ProfileUserName>
		</>
	)
}


const UserStyledPhoto = styled.div`
	height: 100%;
	width: 100%;
	padding: 20px;
	position: relative;
	img {
		border-radius: 15px;
		border: 3px solid white;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

const AddPhotoInput = styled.input`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
	& + label {
		font-size: 1.25em;
		line-height: 1;
		font-weight: 500;
		color: #111010;
		background-color: #fff;
		border-radius: 50%;
		display: inline-block;
		position: absolute;
		bottom: 5%;
		right: 5%;
		padding: 4px 8px;
		transition: all 0.3s ease 0s;
		cursor: pointer;
		&:hover{
			background-color: #a34ef3;
			color: #fff;
		}
	}
`

const ProfileUserName = styled.span`
	font-family: "Quicksand", sans-serif;
	font-size: 20px;
	font-weight: 700;
	color: rgb(79, 81, 91);
	p{
		font-weight: 400;
		font-size: 13px;
		margin-top: 10px;
	}
`