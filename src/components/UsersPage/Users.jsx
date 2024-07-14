import c from './Users.module.scss';
import { useEffect, useState } from 'react';
import { Loader } from '../common/Loader/Loader';
import { Button } from '../common/Button';
import { User } from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingInProgress, getIsFetching, getTotalUsers, getUsersOnPage, obtainUsers, setCurrentPage } from '../../redux/selectors/users-selectors';
import { followUsersThunkCreator, getUsersThunkCreator, loadMoreUsersThunkCreator, toggleFollowingProgressAC } from '../../redux/reducers/usersReducer';
import { Pagination } from '../common/pagination/Pagination';


export const Users = () => {

	//все ранее приходящие из контейнерной комп. пропсы переписываем на useSelector()
	const users = useSelector(obtainUsers)
	const totalUsers = useSelector(getTotalUsers)
	const usersOnPage = useSelector(getUsersOnPage)
	const currentPage = useSelector(setCurrentPage)
	const isFetching = useSelector(getIsFetching)
	const followingInProgress = useSelector(getFollowingInProgress) //пока не получилось реализовать:
	
	//useState
	const [activePage, setActivePage] = useState(1)

	//вместо переданных диспатчей исп-ем useDispatch()
	const dispatch = useDispatch()

	//mapDispatchToProps из классовой переписываем на ф-ции и
	//напрямую диспатчим из них thunk

	const onLoadButtonClick = () => {
		dispatch(loadMoreUsersThunkCreator(currentPage, usersOnPage));
	}

	const toggleFollowUsers = (userId) => {
		dispatch(followUsersThunkCreator(userId))
	}

	//пока не получилось реализовать
	const toggleFollowingProgress = (isFetching, userId) => {
		dispatch(toggleFollowingProgressAC(isFetching, userId))
	}

	//ф-ция для пагинатора
	const changeCurrentPage = (currentPage) => {
		dispatch(getUsersThunkCreator(currentPage, usersOnPage))
	}
 
	//вместо componentDidMount создаем запрос на сервер с useEffect для первоначальной отрисовки
	useEffect(() => {
		dispatch(getUsersThunkCreator(currentPage, usersOnPage))
	}, [])

	return (
		<div className={c.users__wrap}>
			{isFetching ? <Loader /> : null}
			<Pagination 
				usersOnPage={usersOnPage}
				changeCurrentPage={changeCurrentPage}
				totalUsers={totalUsers}
				activePage={activePage}
				setActivePage={setActivePage}
			/>
			<div className={c.users__body}>
				{
					users.map(u => 
					<User u={u} 
						toggleFollowUsers={toggleFollowUsers} 
						key={u.id} 
						followingInProgress={followingInProgress}
					/>
				)}
			</div>
			<div className={c.users__load}>
				<Button onClick={onLoadButtonClick}>Load more</Button>
			</div>
		</div>
	)
}