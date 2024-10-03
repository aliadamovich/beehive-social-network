import { Link } from 'react-router-dom';
import userPhoto from './../../../assets/images/user.png';
import { UserType } from '../../../types/types';
import {  Card, Divider } from 'antd';
import { AppStatusType } from '../../../redux/reducers/appReducer';
import { Avatar } from '../../common/Avatar';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { MainButton } from '../../common/MainButton';


type UserPropsType = {
	u: UserType
	toggleFollowUsers: (userId: number) => void
	followingInProgress: number[]
	appStatus: AppStatusType
}

export const User = ({ u, toggleFollowUsers, followingInProgress, appStatus }: UserPropsType) => {

	return (
		<>
			<Card loading={appStatus === 'loading'} style={{overflow: 'hidden'}}

			>
				<StyledUserTop>

					<Link to={'/profile/' + u.id}>
						<Avatar photo={u.photos.small !== null ? u.photos.small : userPhoto} width='80px' height='80px' />
					</Link>
					
					<StyledUserData>
						<StyledUserName>{u.name}</StyledUserName>
						<p>Country: </p>
						<p>City: </p>
					</StyledUserData>

				</StyledUserTop>

				<StyledStatus><p>{u.status || 'No status yet...'}</p> </StyledStatus>
				<Divider style={{margin: '12px 0'}}/>
				<MainButton 
					children={u.followed ? 'Unfollow' : 'Follow'}
					onClick={() => { toggleFollowUsers(u.id) }} 
					loading={followingInProgress.some(el => el === u.id) }
				/>
			</Card>
		</>
	)
}


const StyledUserTop = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`

const StyledUserData = styled.div`
	overflow: hidden;
	>*:not(:last-child) {
		margin-bottom: 4px;
	}
`

const StyledUserName = styled.h4`
	font-family: ${myTheme.fonts.secondary};
	color: ${myTheme.colors.boldFontColor};
	font-weight: 700;
	font-size: 19px;
`

const StyledStatus = styled.div`
	justify-content: center;
	display: flex;
	font-size: 15px;
	margin: 15px 0 0 0; 

	p {
		max-width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

`









//original card
// export const User = ({ u, toggleFollowUsers, followingInProgress }: UserPropsType) => {
// 	return (
// 		<div className={`${c.users__card} ${c.card}`} >
// 			<NavLink to={'/profile/' + u.id} className={c.card__image}>
// 				<img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
// 			</NavLink>
// 			<div className={c.card__name}>{u.name}</div>
// 			<div className={c.card__location}>
// 				<span className={c.card__city}>{'u.location.city'}, </span>
// 				<span className={c.card__country}>{'u.location.country'}</span>
// 			</div>
// 			<div className={c.card__status}>{u.status}</div>
// 			<Button
// 				disabled={followingInProgress.some(el => el === u.id)
// 				}
// 				onClick={() => { toggleFollowUsers(u.id) }}
// 				className={u.followed ? c.followedBtn : c.unfollowedBtn}>
// 				{u.followed ? 'Unfollow' : 'Follow'}
// 			</Button>
// 		</div>
// 	)
// }