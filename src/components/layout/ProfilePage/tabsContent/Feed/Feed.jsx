import { MyPost } from './MyPost/MyPost';
import React from 'react';
import { PostCreate } from './PostCreate';
import { useSelector } from 'react-redux';
import { getPosts } from '../../../../../redux/selectors/profile-selectors';



export const Feed = React.memo(() => {
	const posts = useSelector(getPosts);
	
	// const newPosts = props.profilePage.posts.map(p => <MyPost message={p.body} type={p.type} key={p.id}/>)

	return (
		<>
			{/* <PostCreate
			newPostText={props.profilePage.newPostText} 
			addPost={props.addPost} 
			updatePostText={props.updatePostText} />
			{posts.map(p => <MyPost message={p.body} type={p.type} key={p.id}/>)}
			{newPosts} */}
		</>
	)
})
