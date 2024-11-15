import { Link } from 'react-router-dom';
import userPhoto from './../../../assets/images/user.png';
import { UserType } from '../../../types/types';
import {  Card, Divider } from 'antd';
import { AppStatusType } from '../../../redux/reducers/appReducer';
import { Avatar } from '../../common/Avatar';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { MainButton } from '../../common/MainButton';
import { AppStateType } from '../../../redux/redux-store';
import { useSelector } from 'react-redux';


type UserPropsType = {
	u: UserType
	toggleFollowUsers: (userId: number) => void
	followingInProgress: number[]
}

export const User = ({ u, toggleFollowUsers, followingInProgress }: UserPropsType) => {
	const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status);
	
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

