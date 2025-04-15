import { useSafeUserId } from 'app/hooks/useSafeUserId'
import { ModalPhotoSlider } from 'features/GalleryPage/ui/modalPhotoSlider/ModalPhotoSlider'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'

export const ProfileMiniGallery = () => {
	const { isOwner } = useSafeUserId()
	return (
		<>
			{isOwner 
			? <ModalPhotoSlider preview />
			: <div>No photos yet...</div>
			}
		</>
	)
}

