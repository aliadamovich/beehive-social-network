import React from 'react'
import error from './../../assets/images/error404.jpeg'
import styled from 'styled-components'

export const Error404 = () => {
	return (
		<ErrorContainer>
			<img src={error} alt="" />
			<span>Error 404...</span>
		</ErrorContainer>
	)
}

const ErrorContainer = styled.div`
	height: 100vh;
	width: 100%;
	background-color: #f1e9f8;
	display: flex;
	/* flex-direction: column; */
	align-items: center;
	justify-content: center;

	> span {
		font-size: 60px;
		font-weight: 700;
		margin-left: 20px;
		color: #a31bf1;
	}

	>img {
		border: 1px solid #a31bf1;
		border-radius: 50%;
		width: 120px;
		height: 120px;
	}
`