import { useSelector } from 'react-redux';
import c from './Photos.module.scss';
import { getPhotoGrid } from '../../../../redux/selectors/photogrid-selectors';

export const Photos = () => {
	// debugger
	const photoGrid = useSelector(getPhotoGrid)

	return (
		<div className={c.photos__container}>
			<h3 className={c.photos__title}>My photos</h3>
			<div className={c.photos__grid}>
				{/* {photoGrid.map(greed => <PhotoGreed src={greed.photo} key={greed.id} />)} */}
			</div>
		</div>
	)
}

// const PhotoGreed = (props) => {
// 	return(
// 		<div className={c.photos__item}>
// 			<img src={props.src} alt="photo grid" />
// 		</div>
// 	)
// }