import c from './Gallery.module.scss';
import { Search } from '../../common/Search/Search';
import { Recent } from '../../common/Recent/Recent';
import { Container } from '../../common/Container';
import { useSelector } from 'react-redux';
import { getPhotoGrid } from '../../../redux/selectors/photogrid-selectors';
import styled from 'styled-components';
import { PhotoGrid } from './PhotoGrid';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { VscChromeClose } from "react-icons/vsc";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { useEffect, useRef, useState } from 'react';
import s from './Swiper.module.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export const Gallery = () => {
	const [activePhotoIndex, setActivePhotoIndex] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const photoGrid = useSelector(getPhotoGrid);
	const swiper = useSwiper();
	const openPhoto = (photoIndex: number) => {
		setActivePhotoIndex(photoIndex);
		setIsModalOpen(true)
	}

	return (
		<>
			<StyledGallerySection>
				{/* {isModalOpen && <StyledBackGround onClick={() => { setIsModalOpen(false) }}></StyledBackGround>} */}
				<Container>

							<Search />
							<StyledGalleryContent>
								<StyledPhotosContainer>
										<PhotoGrid photoGrid={photoGrid} openPhoto={openPhoto}/>
								</StyledPhotosContainer>
								<Recent />
							</StyledGalleryContent>

				</Container>
			{isModalOpen &&
				<StyledModalWindow>

					<Swiper
						initialSlide={activePhotoIndex}
						slidesPerView={1}
						spaceBetween={10}
						navigation={{
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						}}
						// pagination={{ el: '.swiper-pagination', clickable: true }}
						// navigation={{
						// 	nextEl: '.swiper-button-next',
						// 	prevEl: '.swiper-button-prev',
						// }}
						modules={[Pagination, Navigation]}
						className={s.slider}>
						{photoGrid.map(p => <SwiperSlide key={p.id} className={s.slide}><img src={p.photo} alt="user's photo" /></SwiperSlide>)}

						<CustomSwiperButtonPrev><GrLinkPrevious /></CustomSwiperButtonPrev>
						<CustomSwiperButtonNext><GrLinkNext /></CustomSwiperButtonNext>
					</Swiper>
					
					<StyledClose onClick={() => { setIsModalOpen(false) }}><VscChromeClose /></StyledClose>
				</StyledModalWindow>}
				<StyledBackGround onClick={() => { setIsModalOpen(false) }}></StyledBackGround>
			</StyledGallerySection>

		</>
	)
}


const StyledGallerySection = styled.section`

`


const StyledGalleryContent = styled.div`
	display: flex;
	gap: 40px;

	>div:nth-child(2) {
		flex: 0 1 auto;
	}
`

const StyledPhotosContainer = styled.div`
	padding: 40px 10px 10px;
	border-top: 1px solid rgb(237, 241, 245);
	flex: 0 1 60%;
`

//Modal

const StyledModalWindow = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 2003;
	overflow: hidden;
`

const StyledBackGround = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #1b1b1b94;
	z-index: 2002;
`

const StyledClose = styled.button`
	position: absolute;
	top: 10%;
	right: 10%;
	border: none;
	border-radius: 50%;
	background: linear-gradient(to top left, rgb(189, 139, 237) 20%, rgb(129, 29, 222));
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease 0s;
	z-index: 2003;
	svg{
		width: 25px;
		height: 25px;
		color: #fff;
	}
	&:hover{
		opacity: 0.8;
	}
`
//Swiper

const StyledSwiperButton = styled.div`
  color: currentColor;
  background-color: #ffffff82;
  border-radius: 50%;
  width: 40px;
  height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease 0s;
	z-index: 2004;
	&::after{
		display: none;
		visibility: hidden;
	}
	svg {
		width: 18px;
		height: 18px;
	}

  &:hover {
    background-color: #ffffffb0;
	}
`

const CustomSwiperButtonNext = styled(StyledSwiperButton).attrs({
	className: 'swiper-button-next'
})``;

const CustomSwiperButtonPrev = styled(StyledSwiperButton).attrs({
	className: 'swiper-button-prev'
})``;