import { useSelector } from 'react-redux';
import { getProfile } from '../../../../../redux/selectors/profile-selectors';
import { Avatar } from '../../../../common/Avatar';
import styled from 'styled-components';

type PostItemPropsType = {
	type: string
	message: string
	number?: number
}
export const PostItem = (props: PostItemPropsType) => {
	const userProfile = useSelector(getProfile);
	
	return(
		<StyledPost>
			<StyledPostContainer>
				<StyledPostAvatar>
					{userProfile?.photos?.small && <Avatar photo={userProfile.photos?.small} />}
				</StyledPostAvatar>
				<StyledPostContent>
					<StyledTop>
						<StyledTitle>
							<span>{userProfile?.fullName}</span>
							{` ${props.type}`}
						</StyledTitle>
						<StyledTime>14 hours <span> ago</span></StyledTime>
					</StyledTop>
					<StyledPostBody>{props.message}</StyledPostBody>
					<StyledLikes>{props.number} likes</StyledLikes>
				</StyledPostContent>
			</StyledPostContainer>
		</StyledPost>
	)
}




const StyledPost = styled.div`
	align-self: start;
	padding: 0 40px;
`

const StyledPostContainer = styled.div`
	display: flex;
	align-items: start;
	gap: 10px;
`

const StyledPostAvatar = styled.div`
	position: relative;
	&::after {
			content: '';
			position: absolute;
			width: 1px;
			height: 200%;
			top: 110%;
			left: 50%;
			background: rgb(237, 241, 245);
		}

`

const StyledPostContent = styled.div`
	margin-bottom: 20px;
`

const StyledTop = styled.div`
	margin-bottom: 20px;
`

const StyledTitle = styled.p`
	margin-bottom: 12px;
	font-size: 14px;
	span {
			color: rgb(17, 16, 16);
			font-weight: 600;
		}
`

const StyledTime = styled.p`
	font-size: 13px;
	color: rgb(187, 187, 220);
`

const StyledPostBody = styled.div`
// margin-top: 20px;
		font-size: 18px;
		color: rgb(65, 67, 69);
		margin-bottom: 10px;
`

const StyledLikes = styled.div`
	display: inline-block;
	font-size: 13px;
	color: inherit;

	&:hover {
		color: #000;
	}
`