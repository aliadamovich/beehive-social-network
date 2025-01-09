import React, {  useState } from 'react'
import styled from 'styled-components';
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

type PaginationPropsType = {
	usersOnPage: number
	totalUsers: number 
	changeCurrentPage: (currentPage: number) => void
	activePage: number
	// setActivePage: (activePage: number) => void
	portionSize?: number
}

export const Pagination = ({ usersOnPage, totalUsers, changeCurrentPage, activePage, portionSize = 5 }: PaginationPropsType) => {
	const [currentPortion, setCurrentPortion] = useState(1);
	
	const numberOfPages = Math.ceil(totalUsers / usersOnPage);
	
	//создаем массив по количеству страниц чтобы пробежаться по нему map
	const pagesArray = Array.from({ length: numberOfPages }, (_, index) => index + 1);
	//рассчитываем порции страниц
	const portionsCount = Math.ceil(numberOfPages / portionSize);

	const startPage = (currentPortion - 1) * portionSize + 1;
	const endPage = currentPortion * portionSize;

	const onPageClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		changeCurrentPage(Number(e.currentTarget.textContent))
		// setActivePage(Number(e.currentTarget.textContent))
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
	/* width: 160px; */
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
