import { MyPost } from './MyPost/MyPost';
import React from 'react';
import { PostCreate } from './PostCreate';



export const Feed = React.memo((props) => {
	const newPosts = props.profilePage.posts.map(p => <MyPost message={p.body} type={p.type} key={p.id}/>)

	return (
		<>
			<PostCreate
			newPostText={props.profilePage.newPostText} 
			addPost={props.addPost} 
			updatePostText={props.updatePostText} />
			{newPosts}
		</>
	)
})
