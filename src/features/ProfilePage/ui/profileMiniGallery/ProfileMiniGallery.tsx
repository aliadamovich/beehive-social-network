import { ModalPhotoSlider } from 'features/GalleryPage/ui/modalPhotoSlider/ModalPhotoSlider'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'
import React from 'react'

export const ProfileMiniGallery = ({isOwner, profileId}: ProfileProps) => {
	return (
		<>
			{isOwner 
			? <ModalPhotoSlider preview />
			: <div>No photos yet...</div>
			}
		</>
	)
}

