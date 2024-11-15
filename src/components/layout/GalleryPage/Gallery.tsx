import { Search } from '../../common/Search/Search';
import { Recent } from '../../common/Recent/Recent';
import { Container } from '../../common/Container';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ModalPhotoSlider } from './modalPhotoSlider/ModalPhotoSlider';


export const Gallery = () => {

	return (

		<StyledGallerySection>
			<Container>
				<Search />
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

	>div:nth-child(2) {
		flex: 0 1 auto;
	}
`

const StyledPhotosContainer = styled.div`
	padding: 40px 10px 10px;
	border-top: 1px solid rgb(237, 241, 245);
	flex: 0 1 60%;
`



