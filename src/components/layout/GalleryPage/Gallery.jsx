import c from './Gallery.module.scss';
import { Search } from '../../common/Search/Search';
import { Recent } from '../../common/Recent/Recent';
import { Container } from '../../common/Container';

export const Gallery = (props) => {

	return (
		<section className={c.gallery}>
			<Container>
				<div className={c.gallery__content}>
					<div className={c.gallery__body}>
						<Search />
						<PhotoGrid photoGrid={props.photoGrid}/>
					</div>
					<Recent />
				</div>
			</Container>
		</section>
	)
}

export const PhotoGrid = (props) => {

	return (
			<div className={c.grid}>
				{ props.photoGrid.map(p => <div className={c.grid__item} key={p.id}><img src={p.photo} alt="photo grid" /></div>) }
			</div>
	)
}