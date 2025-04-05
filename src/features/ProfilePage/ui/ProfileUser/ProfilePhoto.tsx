import styled from 'styled-components';
import null_user from './../../../../assets/images/user.png';
import { ChangeEvent } from 'react';
import { myTheme } from '../../../../styles/Theme';
import { SectionTitle } from '../../../../common/components/SectionTitle';
import { useGetProfileQuery, useSetProfilePhotoMutation } from 'features/ProfilePage/api/profileApi';
import { useSelector } from 'react-redux';
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType';
import { selectProfileData } from 'features/ProfilePage/model/selectors/profileDataSelector';
import { useSafeUserId } from 'app/hooks/useSafeUserId';


export const ProfilePhoto = ({ isOwner }: ProfileProps) => {
	const userId = useSafeUserId()
	const { data: profileData } = useGetProfileQuery(userId)
	
	const [setProfilePhoto] = useSetProfilePhotoMutation()
	
	const addPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const formData = new FormData() as FormData;
			formData.append("image", e.target.files[0]);
			console.log(formData);
			console.log(e.target.files[0]);
			setProfilePhoto(formData)
		}
	}
	return (
		<>
			<UserStyledPhoto>
				{
					profileData?.photos.large
					? <img src={profileData?.photos.large} alt="user" /> 
					: <img src={null_user} alt="user" />
				}
				{isOwner &&
					<>
					<AddPhotoInput id='file' onChange={addPhotoHandler} type={'file'} />
						<label htmlFor="file">+</label>
					</>
				}
			</UserStyledPhoto>

			<SectionTitle>{profileData?.fullName}</SectionTitle>
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
