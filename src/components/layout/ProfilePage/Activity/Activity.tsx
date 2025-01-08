import { useSelector } from 'react-redux';
import { SectionTitle } from '../../../common/SectionTitle';
import styled from 'styled-components';
import { PostItem } from '../tabsContent/postsFeed/PostItem';
import { myTheme } from '../../../../styles/Theme';
import { selectPosts } from '../../../../redux/reducers/profileSlice';

export const Activity = () => {
	const posts = useSelector(selectPosts);
	const latestPosts = posts.slice(0, 3).map(p => <PostItem type={p.type} key={p.id} />)
	return(
		<ActivityContainer>
			<SectionTitle>Recent activity</SectionTitle>
			{latestPosts}
		</ActivityContainer>
	)
}

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
			transform: translateX(-50%);
			background: ${myTheme.colors.accent};
		}
	}
`