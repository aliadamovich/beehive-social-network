import { useSelector } from 'react-redux';
import { SectionTitle } from '../../../../common/components/SectionTitle';
import styled from 'styled-components';
import { PostItem } from '../tabsContent/postsFeed/PostItem';
import { myTheme } from '../../../../styles/Theme';
import { selectPosts } from 'features/ProfilePage/model/profileSlice';
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType';
import React from 'react';
import { useSafeUserId } from 'app/hooks/useSafeUserId';

export const Activity = React.memo(() => {
	const posts = useSelector(selectPosts);
	const { isOwner } = useSafeUserId()
	const latestPosts = posts.slice(0, 3).map(p => <PostItem type={p.type} key={p.id} />)
	return(
		<StyledActivitySection>
			<ActivityContainer>
				<SectionTitle textAlignCenter>Recent activity</SectionTitle>
				{isOwner && latestPosts.length ? latestPosts : <div style={{textAlign:'center'}}>No activity yet...</div>}
			</ActivityContainer>
		</StyledActivitySection>
	)
})

const StyledActivitySection = styled.div`
	padding-top: 30px;
	border-top: 1px solid ${myTheme.colors.borderColor};
	border-left: 1px solid ${myTheme.colors.borderColor};

	@media ${myTheme.media[1350]} {
		display: none;
	}
`
const ActivityContainer = styled.div`
	padding: 0 0 0 20px;
	& > h2 {
		position: relative;
		padding-bottom: 20px;
		margin-bottom: 30px;
			&::after {
			content: '';
			position: absolute;
			width: 15%;
			height: 2px;
			bottom: 0px;
			right: 50%;
			transform: translateX(50%);
			background: ${myTheme.colors.accent};
		}
	}
`