import { PostItem } from './PostItem';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../../../../../redux/selectors/profile-selectors';
import { SendMessage } from '../../../../common/sendMessageField/SendMessage';
import { useDispatch } from 'react-redux';
import { addPostAC } from '../../../../../redux/reducers/profileReducer';



export const PostsFeed = React.memo(() => {
	const [post, setPost] = useState('');
	const posts = useSelector(getPosts);
	const dispatch = useDispatch()

	const sendPostHandler = () => {
		if(post.trim() !== '') {
			dispatch(addPostAC(post))
			setPost('')
		}
		
	}
	
	return (
		<>
			<SendMessage 
				updateText={(e) => { setPost(e) }} 
				addMessage={sendPostHandler} 
				messageText={post}/>

			{posts.map(p => <PostItem message={p.body} type={p.type} key={p.id}/>)}
		</>
	)
})
