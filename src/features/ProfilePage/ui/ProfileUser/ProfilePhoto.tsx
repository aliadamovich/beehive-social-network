import styled from 'styled-components';
import null_user from './../../../../assets/images/user.png';
import { ChangeEvent } from 'react';
import { myTheme } from '../../../../styles/Theme';
import { SectionTitle } from '../../../../common/components/SectionTitle';
import { useGetProfileQuery, useSetProfilePhotoMutation } from 'features/ProfilePage/api/profileApi';
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType';
import { useSafeUserId } from 'app/hooks/useSafeUserId';
import { Spin } from 'antd';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';

export const ProfilePhoto = () => {
	const userId = useSafeUserId()
	const { isOwner, profileData } = useSafeUserId()
	const [setProfilePhoto, {isLoading: isSetPhotoLoading}] = useSetProfilePhotoMutation()

	const addPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const formData = new FormData() as FormData;
			formData.append("image", e.target.files[0]);
			setProfilePhoto(formData)
		}
	}

	return (
		<>
			<UserStyledPhoto>
				<StyledContainer>
					{
						profileData?.photos.large
						? <img src={profileData?.photos.large} alt="user" /> 
						: <img src={null_user} alt="user" />
					}
					{isOwner &&
					<>
						<AddPhotoInput id='file' onChange={addPhotoHandler} type={'file'} />
						<label htmlFor="file">
							{isSetPhotoLoading ? <Spin style={{ color: `${myTheme.colors.accentLight}` }} indicator={<LoadingOutlined spin />} size="small" /> : <CameraOutlined />}
						</label>
					</>
					}
				</StyledContainer>
			</UserStyledPhoto>
				
			<SectionTitle>{profileData?.fullName}</SectionTitle>
		</>
	)
}


export const UserStyledPhoto = styled.div`
	min-height: 240px;
	padding: 20px;
	border-radius: 12px;
		
	img {
		/* border: 3px solid white; */
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 12px;
		position: relative;
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

const StyledContainer = styled.div`
	position: relative;
	
`


const AddPhotoInput = styled.input`
	display: none;
	& + label {
		z-index: 100;
		font-size: 22px;
		color: ${myTheme.colors.mainFontColor};
		background-color: ${myTheme.colors.whiteBackground};
		border-radius: 50%;
		display: inline-block;
		position: absolute;
		bottom: 0%;
		right: 0%;
		transform: translate(50%, 50%);
		padding: 6px ;
		transition: all 0.3s ease 0s;
		cursor: pointer;
		&:hover{
			background-color: ${myTheme.colors.accentLight};
			color: ${myTheme.colors.whiteBackground};
		}
	}
`
