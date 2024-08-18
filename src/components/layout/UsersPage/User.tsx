import c from './Users.module.scss';
import { Button } from '../../common/Button';
import { NavLink } from 'react-router-dom';
import userPhoto from './../../../assets/images/user.png';
import { UserType } from '../../../types/types';

type UserPropsType = {
	u: UserType
	toggleFollowUsers: (userId: number) => void
	followingInProgress: number[]
}

export const User = ({ u, toggleFollowUsers, followingInProgress }: UserPropsType) => {
	return (
		<div className={`${c.users__card} ${c.card}`} >
			<NavLink to={'/profile/' + u.id} className={c.card__image}>
				<img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
			</NavLink>
			<div className={c.card__name}>{u.name}</div>
			<div className={c.card__location}>
				<span className={c.card__city}>{'u.location.city'}, </span>
				<span className={c.card__country}>{'u.location.country'}</span>
			</div>
			<div className={c.card__status}>{u.status}</div>
			<Button
				disabled={followingInProgress.some(el => el === u.id)
				}
				onClick={() => { toggleFollowUsers(u.id) }}
				className={u.followed ? c.followedBtn : c.unfollowedBtn}>
				{u.followed ? 'Unfollow' : 'Follow'}
			</Button>
		</div>
	)
}

