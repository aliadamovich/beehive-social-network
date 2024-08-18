import React from 'react'
import userPhoto from './../../assets/images/user.png'
import styled from 'styled-components'

type AvatarPropsType = {
	photo: string | null
	width?: string
	height?: string
}

export const Avatar = (props: AvatarPropsType) => {
	return (
		<StyledAvatar width={props.width} height={props.height} photo={props.photo}>
			<img src={props.photo !== null ? props.photo : userPhoto} alt="avatar" />
		</StyledAvatar>
	)
}


const StyledAvatar = styled.div<AvatarPropsType>`
	position: relative;
	width: ${props => props.width || '35px'};
	height: ${props => props.height || '35px'};
	img{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
		border-radius: 50%;
	}
`