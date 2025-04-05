import video_webm from 'assets/video/8_webm.webm'
import video_mp4 from 'assets/video/8.mp4'
import styled from 'styled-components'

export const BackgroundVideo = () => {
	return (
		<Video preload='auto' autoPlay muted loop>
			<source src={video_webm} type='video/webm'/>
			<source src={video_mp4} type='video/mp4'/>
		</Video>
	)
}

const Video = styled.video`
	position: absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	object-fit: cover;
	z-index: 1;
`