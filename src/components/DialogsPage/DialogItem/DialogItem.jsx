import { photos } from '../../../redux/state';
import c from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom';
import userPhoto from './../../../assets/images/user.png';

export const DialogItem = (props) => {

	let path = `/dialogs/${props.id}`;

	return (
		<NavLink to={path} className={c.dialog}>
			<div className={c.dialog__info}>
				<div className={c.dialog__avatar}>
					<img src={props.photo !== null ? props.photo : userPhoto} alt="avatar" />
				</div>
				<div className={c.dialog__name}>
					{props.name}
					<div className={c.dialog__nickname}>@{props.name}</div>
					</div>
			</div>
		</NavLink>
	)
}


// const Avatar = (props) => {
// 	return (
// 		<div className={c.dialog__avatar}>
// 			<img src={props.photo} alt="" />
// 		</div>
// 	)
// }