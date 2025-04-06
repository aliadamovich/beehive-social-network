import error from './../../assets/images/error.png'
import error_mobile from './../../assets/images/error_mobile.png'
import styled from 'styled-components'

export const Error404 = () => {
	return (
		<ErrorContainer>
			<picture>
				<source media="(min-width: 950px)" srcSet={error} />
				<img src={error_mobile} alt="error" />
			</picture>
		</ErrorContainer>
	)
}


const ErrorContainer = styled.div`
	height: 100vh;
	width: 100%;
	>picture {
		width: 100%;
		height: 100%;
		display: block;
		
	}

	picture img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		display: block;
	}
`
