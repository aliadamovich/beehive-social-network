import { PostItem } from './PostItem';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SendMessage } from '../../../../../common/components/sendMessageField/SendMessage';
import { useDispatch } from 'react-redux';
import { Timeline } from 'antd';
import styled from 'styled-components';
import { myTheme } from '../../../../../styles/Theme';
import { addPost, selectPosts } from 'features/ProfilePage/model/profileSlice';
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType';



export const PostsFeed = React.memo(({isOwner}: ProfileProps) => {
	const [post, setPost] = useState('');
	const posts = useSelector(selectPosts);
	const dispatch = useDispatch()

	const sendPostHandler = () => {
		if(post.trim() !== '') {
			dispatch(addPost({post}))
			setPost('')
		}
	}

	const postItems = posts.map((p) => ({
		key: p.id,
		color: `${myTheme.colors.accentLight}`,
		style: { padding: '0' }, 
		children: <PostItem message={p.body} type={p.type}/>,
	}));
	
	return (
		<StyledPostSection>
			{isOwner ?
			<>
				<SendMessage 
					addMessage={sendPostHandler}
					showCount={true}
					maxLength={100}
					title='Send Post'
					loading={false}
				/>
				<StyledPostsContainer>
					<Timeline items={postItems} />
				</StyledPostsContainer>
			</>
			: <div>No posts yet...</div>
			}
		</StyledPostSection>
	)
})

const StyledPostSection = styled.div`
	>div:nth-child(1){
		border-top: none;
	}
`
const StyledPostsContainer = styled.div`
	padding: 0 40px;

		@media ${myTheme.media[576]} {
			padding: 0 10px;
		}
`