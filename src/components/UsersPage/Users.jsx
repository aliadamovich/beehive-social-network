import c from './Users.module.scss';
import userPhoto from './../../assets/images/user.png';
import React, { useState } from 'react';
import { Loader } from '../common/Loader/Loader';
import { NavLink } from 'react-router-dom';
import { Button } from '../common/Button';
import { User } from './User';


export const Users = (props) => {

	// let [filter, setFilter] = useState('all');

	// let filteredUsers = props.users;
	// if (filter === 'followed') filteredUsers = filteredUsers.filter(u => u.followed)
	// if (filter === 'unfollowed') filteredUsers = filteredUsers.filter(u => !u.followed)
	
	// const onUsersFilter = (value) => {
	// 	setFilter(value)
	// }
	
	return (
		<div className={c.users__wrap}>
			{ props.isFetching ? <Loader /> : null}
			<div className={c.users__body}>
				{
					props.users.map(u => <User u={u} toggleFollowUsers={props.toggleFollowUsers} key={u.id}/>)
				}
			</div>
			<div className={c.users__load}>
				<Button onClick={() => { props.onLoadClick() }}>Load more</Button>
				{/* <Button onClick={() => onUsersFilter('followed')}>Followed</Button>
				<Button onClick={() => onUsersFilter('unfollowed')}>Unfollowed</Button>
				<Button onClick={() => onUsersFilter('all')}>All</Button> */}
			</div>
		</div>
	)
}