import { useSelector } from 'react-redux';
import { getProfile } from '../../../../../redux/selectors/profile-selectors';
import { Avatar } from '../../../../common/Avatar';
import styled from 'styled-components';
import { myTheme } from '../../../../../styles/Theme';

type PostItemPropsType = {
	type: string
	message?: string
	number?: number
}
export const PostItem = (props: PostItemPropsType) => {
	const userProfile = useSelector(getProfile);
	
	return(
		<StyledPost>
			<div>
				{userProfile?.photos?.small && <Avatar photo={userProfile.photos?.small} />}
			</div>
			<StyledPostContent>
				<div>
					<StyledTitle>
						<span>{userProfile?.fullName}</span>
						{` ${props.type}`}
					</StyledTitle>
					<StyledTime>14 hours <span> ago</span></StyledTime>
				</div>
				<StyledPostBody>{props.message}</StyledPostBody>
				<StyledLikes>{props.number} likes</StyledLikes>
			</StyledPostContent>
		</StyledPost>
	)
}




const StyledPost = styled.div`
	gap: 10px;
	display: flex;
	color: ${myTheme.colors.mainFontColor}
`


const StyledPostContent = styled.div`
	margin-bottom: 20px;
`


const StyledTitle = styled.p`
	margin-bottom: 8px;
	span {
			color: ${myTheme.colors.boldFontColor};
			font-weight: 600;
		}
`

const StyledTime = styled.p`
	font-size: 13px;
	color: #bbbbdc;
`

const StyledPostBody = styled.div`
	margin: 10px 0;
	font-size: 16px;
	color: ${myTheme.colors.mainFontColor};
`

const StyledLikes = styled.div`
	display: inline-block;
	font-size: 13px;

`