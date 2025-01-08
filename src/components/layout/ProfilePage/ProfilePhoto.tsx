import styled from 'styled-components';
import null_user from './../../../assets/images/user.png';
import { ProfileType } from '../../../types/types';
import { ChangeEvent } from 'react';
import { myTheme } from '../../../styles/Theme';
import { SectionTitle } from '../../common/SectionTitle';

type ProfilePhotoType = {
	userProfile: ProfileType | null
	onPhotoChoose: (file: File) => void
	isOwner: boolean
}


export const ProfilePhoto = (props: ProfilePhotoType) => {

	const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			props.onPhotoChoose(e.target.files[0])
		}
	}
	return (
		<>
			<UserStyledPhoto>
				{
					props.userProfile?.photos.large !== null ?
						<img src={props.userProfile?.photos.large} alt="user" /> :
						<img src={null_user} alt="user" />
				}
				{props.isOwner &&
					<>
					<AddPhotoInput id='file' onChange={onInputChangeHandler} type={'file'} />
						<label htmlFor="file">+</label>
					</>
				}
			</UserStyledPhoto>

			<SectionTitle>{props.userProfile?.fullName}</SectionTitle>
		</>
	)
}


export const UserStyledPhoto = styled.div`
	padding: 20px;
	position: relative;
	min-height: 240px;
	img {
		/* border: 3px solid white; */
		border-radius: 12px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media ${myTheme.media[950]} {
		width: 300px;
		height: 300px;
	}

	@media ${myTheme.media[576]} {
		width: 240px;
		height: 240px;
		padding: 0;
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
		color: ${myTheme.colors.boldFontColor};
		background-color: ${myTheme.colors.whiteBackground};
		border-radius: 50%;
		display: inline-block;
		position: absolute;
		bottom: 5%;
		right: 5%;
		padding: 4px 8px;
		transition: all 0.3s ease 0s;
		cursor: pointer;
		&:hover{
			background-color: ${myTheme.colors.accentLight};
			color: ${myTheme.colors.whiteBackground};
		}
	}

	@media ${myTheme.media[576]} {
		& + label {
			bottom: -3%;
			right: -3%;
		}
	}
`
