import styled, { css } from "styled-components";
import { PhotoGridType } from "../../../redux/reducers/photoGridReducer";
import { GridWrapper } from "../../common/GridWrapper";
import { myTheme } from "../../../styles/Theme";

type PhotoGridPropsType = {
	photoGrid: Array<PhotoGridType>
	openPhoto: (index: number) => void
	preview?: boolean
}

export const PhotoGrid = (props: PhotoGridPropsType) => {

	const onImageClick = (id: number) => {
		props.openPhoto(id)
	}
	return (
		<PhotoGridContainer preview={props.preview}>
			{props.photoGrid.map((p, index) => <StyledGridItem 
															key={p.id}
															onClick={() => onImageClick(index)}>
															<img src={p.photo} alt="user's photo" />
			</StyledGridItem>)}
		</PhotoGridContainer>
	);
};

const PhotoGridContainer = styled.div<{ preview?: boolean }>`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;

	@media ${myTheme.media[1120]} {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

		${props => props.preview && css<{ preview?: boolean }>`
		grid-template-columns: repeat(3, 1fr);
		`}
	}
`

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
