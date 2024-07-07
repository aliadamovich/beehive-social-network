import React, { useState } from 'react'
import { getTotalUsers, getUsersOnPage } from '../../../redux/selectors/users-selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const Pagination = ({ changeCurrentPage }) => {
	const totalUsers = useSelector(state => getTotalUsers(state));
	const usersOnPage = useSelector(state => getUsersOnPage(state));
	const numberOfPages = Math.ceil(totalUsers / usersOnPage);
	const [currentPage, setCurrentPage] = useState(1)

	//создаем массив по количеству страниц чтобы пробежаться по нему map
	const pagesArray = Array(numberOfPages).fill().reduce((acc, _, index) => {
		acc.push(index + 1)
		return acc
	}, [])
	
	const onPageClickHandler = (e) => {
		changeCurrentPage(e.currentTarget.textContent)
		setCurrentPage(Number(e.currentTarget.textContent))
	}

	return (
		<PaginationWrapper>
			{
				pagesArray.map(p => {
					return <Page onClick={onPageClickHandler} key={p}
						className={currentPage === p ? 'active' : ''}>{p}</Page>
				})
			}
		</PaginationWrapper>
	)
}

const PaginationWrapper = styled.div`
	text-align: right;
	margin-bottom: 15px;
`

const Page = styled.span`
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
