import { ModalPhotoSlider } from 'features/GalleryPage/ui/modalPhotoSlider/ModalPhotoSlider'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'

export const ProfileMiniGallery = ({isOwner}: ProfileProps) => {

	return (
		<>
			{isOwner 
			? <ModalPhotoSlider preview />
			: <div>No photos yet...</div>
			}
		</>
	)
}

