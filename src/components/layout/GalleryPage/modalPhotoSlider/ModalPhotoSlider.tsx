import { useState } from 'react'
import { useSelector } from 'react-redux';
import { getPhotoGrid } from '../../../../redux/selectors/photogrid-selectors';
import { PhotoGrid } from '../PhotoGrid';
import styled from 'styled-components';
import { myTheme } from '../../../../styles/Theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { VscChromeClose } from "react-icons/vsc";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { Navigation, Pagination } from 'swiper/modules';
import s from './Swiper.module.scss';

export const ModalPhotoSlider = () => {

	const [activePhotoIndex, setActivePhotoIndex] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const photoGrid = useSelector(getPhotoGrid);

	const openPhoto = (photoIndex: number) => {
		setActivePhotoIndex(photoIndex);
		setIsModalOpen(true)
	}
	
	return (
		<>
			<PhotoGrid photoGrid={photoGrid} openPhoto={openPhoto} />
			{isModalOpen &&
				<StyledModalWindow onClick={() => { setIsModalOpen(false) }}>

					<ModalContent onClick={(e) => { e.stopPropagation() }}>

						<Swiper
							initialSlide={activePhotoIndex}
							slidesPerView={1}
							spaceBetween={10}
							navigation={{
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							}}
							modules={[Pagination, Navigation]}
							className={s.slider}>
							{photoGrid.map(p => <SwiperSlide key={p.id} className={s.slide}><img src={p.photo} alt="user's photo" /></SwiperSlide>)}

							<CustomSwiperButtonPrev><GrLinkPrevious /></CustomSwiperButtonPrev>
							<CustomSwiperButtonNext><GrLinkNext /></CustomSwiperButtonNext>
						</Swiper>

						<StyledClose onClick={() => { setIsModalOpen(false) }}><VscChromeClose /></StyledClose>
					</ModalContent>
				</StyledModalWindow>
			}
		</>
	)
}

const StyledModalWindow = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 20003;
	overflow: hidden;
	background-color: #1b1b1bc0;
	display: flex;
	justify-content: center;
	align-items: center;
	
`
const ModalContent = styled.div`
	width: 90%;
	height: 90%;
	
	max-width: 1000px;
	padding: 10px;
	background-color: ${myTheme.colors.whiteBackground};
	border-radius: 4px;
`


const StyledClose = styled.button`
	position: absolute;
	top: 5%;
	right: 5%;
	border: none;
	border-radius: 50%;
	background-color: #ffffff82;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease 0s;
	z-index: 2003;
	svg{
		width: 25px;
		height: 25px;
		color: currentColor;
	}
	&:hover{
		background-color: #ffffffb0;
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