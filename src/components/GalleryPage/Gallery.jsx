import c from './Gallery.module.scss';
import { Search } from '../common/Search/Search';
import {Recent} from '../common/Recent/Recent';
import { Container } from '../common/Container';

export const Gallery = (props) => {

	return (
		<div className={c.gallery}>
			<Container>
				<div className={c.gallery__content}>
					<div className={c.gallery__body}>
						<Search />
						<div className={c.gallery__grid}>
							<PhotoGrid photoGrid={props.photoGrid}/>
						</div>
					</div>
					<div className={c.gallery__recent}>
						<Recent />
					</div>
				</div>
			</Container>
		</div>
	)
}

export const PhotoGrid = (props) => {
	// debugger
	return (
		<div className={c.grid__content}>
			<div className={c.grid__photo}>
				{
				 props.photoGrid.map(p => <div className={c.grid__item}><img src={p.photo} alt="photo grid" /></div>)
				}
				
			</div>
			{props.isUser ? <div className={c.grid__user}>
				<div className={c.user__photo}><img src="" alt="" />
					<span></span>
				</div>
			</div> 
			: null }
			
		</div>
	)
}