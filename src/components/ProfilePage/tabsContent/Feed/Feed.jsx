import { MyPost } from './MyPost/MyPost';
import c from './Feed.module.scss';
import React from 'react';
import { PostCreate } from './PostCreate';



export const Feed = React.memo((props) => {
	const newPosts = props.profilePage.posts.map(p => <MyPost message={p.body} type={p.type} key={p.id}/>)

	return (
		<div className={c.posts}>
			<div className={c.postCreate}>

				<PostCreate
				newPostText={props.profilePage.newPostText} 
				addPost={props.addPost} 
				updatePostText={props.updatePostText} />

			</div>

			{newPosts}

		</div>
	)
})
