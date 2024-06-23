import c from './PostCreate.module.scss';
import React from 'react';
import { Button } from './../../common/Button';
import { IconsRow } from '../../common/iconsrow/IconsRow';


export const PostCreate = (props) => {
	let textArea = React.createRef();

	function onAddPost() {
		props.addPost();
	}

	function onPostChange () {
		let text = textArea.current.value;
		props.updatePostText(text);
	}

	return (
		<div className={c.postCreate__content}>
			<div className={c.postCreate__body}>
				<textarea value={props.newPostText} onChange={onPostChange} ref={textArea} placeholder="What's new?" name="" id=""></textarea>
				<Button onClick={onAddPost}>Publish</Button>
			</div>
			<IconsRow />
		</div>
	)
}