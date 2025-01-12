import error from './../../assets/images/404.jpg'
import styled from 'styled-components'

export const Error404 = () => {
	return (
		<ErrorContainer>
		</ErrorContainer>
	)
}

const ErrorContainer = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url(${error})  no-repeat;
	background-size: contain;

	> span {
		font-size: 60px;
		font-weight: 700;
		margin-left: 20px;
		color: #a31bf1;
	}

	>img {
		border-radius: 50%;
		width: 120px;
		height: 120px;
	}
`
