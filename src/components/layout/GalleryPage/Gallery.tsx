import { Search } from '../../common/Search/Search';
import { Recent } from '../../common/Recent/Recent';
import { Container } from '../../common/Container';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ModalPhotoSlider } from './modalPhotoSlider/ModalPhotoSlider';
import { myTheme } from '../../../styles/Theme';


export const Gallery = () => {

	return (

		<StyledGallerySection>
			<Container>
				<StyledGalleryContent>
					<StyledPhotosContainer>
						<ModalPhotoSlider />
					</StyledPhotosContainer>
					<Recent />
				</StyledGalleryContent>
			</Container>
		</StyledGallerySection>
	)
}


const StyledGallerySection = styled.section`

`

const StyledGalleryContent = styled.div`
	display: flex;
	gap: 60px;
	padding: 40px 10px 10px;
	>div:nth-child(2) {
		flex: 0 1 auto;
	}
	@media ${myTheme.media[1120]} {
		>div:nth-child(2) {
		display: none;
	}
	}
`

const StyledPhotosContainer = styled.div`
	flex: 0 1 65%;

	@media ${myTheme.media[1120]} {
	flex: 1 1 auto;
}
`



