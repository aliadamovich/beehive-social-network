import React, { useState } from 'react'
import { getTotalUsers, getUsersOnPage } from '../../../redux/selectors/users-selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

export const Pagination = ({ usersOnPage, totalUsers, changeCurrentPage, activePage, setActivePage, portionSize = 5 }) => {
	const numberOfPages = Math.ceil(totalUsers / usersOnPage);
	
	//создаем массив по количеству страниц чтобы пробежаться по нему map
	const pagesArray = Array(numberOfPages).fill().reduce((acc, _, index) => {
		acc.push(index + 1)
		return acc
	}, [])

	//рассчитываем порции страниц
	const portionsCount = Math.ceil(numberOfPages / portionSize);
	console.log(portionsCount)
	const [currentPortion, setCurrentPortion] = useState(1);
	const startPage = (currentPortion - 1) * portionSize + 1;
	const endPage = currentPortion * portionSize;

	const onPageClickHandler = (e) => {
		changeCurrentPage(e.currentTarget.textContent)
		setActivePage(Number(e.currentTarget.textContent))
	}

	if (usersOnPage <= 0) {
		console.error('usersOnPage should be greater than 0');
		return null;
	}
	return (

		<PaginationWrapper>
			{currentPortion > 1 && <FaAnglesLeft onClick={() => setCurrentPortion(currentPortion - 1)}/>}
			<StyledPages>
				{
					pagesArray.filter(p => p >= startPage && p <= endPage)
					.map(p => {
						return <StyledPage 
										onClick={onPageClickHandler} 
										key={p}
										className={activePage === p ? 'active' : ''}>
										{p}
									</StyledPage>
					})
				}
			</StyledPages>
			{portionsCount > currentPortion && <FaAnglesRight onClick={() => {setCurrentPortion(currentPortion + 1)}} />}
		</PaginationWrapper>
	)
}

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	margin-bottom: 15px;
	gap: 7px;
	svg {
		width: 10px;
		height: 10px;
		fill: currentColor;
		cursor: pointer;
		&:hover{
			fill: #2e2e2e;
		}
	}
`

const StyledPages = styled.div`
	width: 160px;
	display: flex;
	justify-content: space-between;
`
const StyledPage = styled.span`
	display: inline-block;
	padding: 4px;
	margin-right: 5px;
	font-size: 12px;
	cursor: pointer;
	transition: all 0.3s ease 0s;
	&.active {
		border-bottom: 1px solid grey;
	}
`
