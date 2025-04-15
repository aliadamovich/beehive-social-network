import { Link } from 'react-router-dom';
import userPhoto from './../../../assets/images/user.png';
import { Divider } from 'antd';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { Avatar } from 'common/components/Avatar';
import { DomainUser, getUsersParams } from 'features/UserPage/api/usersApi.types';
import { FollowUserButton } from 'features/UserPage/ui/FollowUserButton';


export type UserPropsType = {
	user: DomainUser 
	params: getUsersParams
}

export const User = ({ user, params }: UserPropsType) => {

	return (
		<>
			<StyledUserCard>
				<Link to={'/profile/' + user.id}>
				<StyledUserTop>
					
						<div>
							<Avatar photo={user.photos.small !== null ? user.photos.small : userPhoto} width='80px' height='80px' />
						</div>
						
						<StyledUserData>
							<StyledUserName>{user.name}</StyledUserName>
							<p>Country:</p>
							<p>City:</p>
						</StyledUserData>
					</StyledUserTop>
	
					<StyledStatus><p>{user.status || 'No status yet...'}</p> </StyledStatus>
				</Link>
				
				<Divider style={{margin: '12px 0'}}/>
				<FollowUserButton user={user} params={params}/>

			</StyledUserCard>
		</>
	)
}

const StyledUserCard = styled.div`
	border: 1px solid #f0f0f0;
	border-radius: 8px;
	padding: 20px;
	overflow: hidden;
`

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
	font-size: 15px;
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

