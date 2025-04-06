import { Avatar } from '../../../../../common/components/Avatar';
import styled from 'styled-components';
import { myTheme } from '../../../../../styles/Theme';
import { useGetProfileQuery } from 'features/ProfilePage/api/profileApi';
import { useSafeUserId } from 'app/hooks/useSafeUserId';

type PostItemPropsType = {
	type: string
	message?: string
}
export const PostItem = ({type, message}: PostItemPropsType) => {

	const userId = useSafeUserId()
	const { data: profileData } = useGetProfileQuery(userId)

	return(
		<StyledPost>
			<div>
				{profileData?.photos?.small && <Avatar photo={profileData.photos?.small} />}
			</div>
			<StyledPostContent>
				<div>
					<StyledTitle>
						<span>{profileData?.fullName}</span>
						<span>❤️ {}</span>
						<span>💬 {}</span>
						{` ${type}`}
					</StyledTitle>
					<StyledTime>14 hours <span> ago</span></StyledTime>
				</div>
				<StyledPostBody>{message}</StyledPostBody>
				<StyledLikes>0 likes</StyledLikes>
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
	font-size: 12px;

`