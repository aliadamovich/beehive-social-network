import c from './Users.module.scss';
import userPhoto from './../../assets/images/user.png';
import React from 'react';
import { Loader } from '../common/Loader/Loader';
import { NavLink } from 'react-router-dom';


export const Users = (props) => {
	// debugger
	return (
		<div className={c.users__wrap}>
			{ props.isFetching ? <Loader /> : null}
			<div className={c.users__body}>

				{

					props.users.map(u => <div className={`${c.users__card} ${c.card}`} key={u.id}>
						<NavLink to={'/profile/' + u.id} className={c.card__image}>
							<img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
						</NavLink>
						<div className={c.card__name}>{u.name}</div>
						<div className={c.card__location}>
							<span className={c.card__city}>{'u.location.city'}, </span>
							<span className={c.card__country}>{'u.location.country'}</span>
						</div>
						<div className={c.card__status}>{u.status}</div>
						<button 
						// disabled={props.followingInProgress.some(el => el === u.id)} 
							onClick={() => {

								props.toggleFollowUsers(u.id)
							}}
							className={u.followed ? c.followedBtn : c.unfollowedBtn}>
							{u.followed ? 'Unfollow' : 'Follow'}
						</button>
					</div>)
				}
			</div>
			<div className={c.users__load}>
				<button onClick={() => { props.onLoadClick() }} className={c.users__btn}>Load more</button>
			</div>
		</div>
	)
}