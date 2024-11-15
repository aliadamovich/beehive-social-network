import styled from "styled-components";
import { PhotoGridType } from "../../../redux/reducers/photoGridReducer";
import { GridWrapper } from "../../common/GridWrapper";

type PhotoGridPropsType = {
	photoGrid: Array<PhotoGridType>
	openPhoto: (index: number) => void
}

export const PhotoGrid = (props: PhotoGridPropsType) => {

	const onImageClick = (id: number) => {
		props.openPhoto(id)
	}
	return (
		<GridWrapper gap='10px'>
			{props.photoGrid.map((p, index) => <StyledGridItem 
															key={p.id}
															onClick={() => onImageClick(index)}>
															<img src={p.photo} alt="user's photo" />
			</StyledGridItem>)}
		</GridWrapper>
	);
};


export const StyledGridItem = styled.div`
	overflow: hidden;
	cursor: pointer;
	border-radius: 8px;
	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 4 / 5;
		transition: all 0.3s ease 0s;
	}

	&:hover {
		/* transition: all 0.3s ease 0s;

		img {
			scale: 1.1;
		} */
	}
`
