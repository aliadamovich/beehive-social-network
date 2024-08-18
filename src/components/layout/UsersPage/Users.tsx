import c from './Users.module.scss';
import { useEffect, useState } from 'react';
import { Loader } from '../../common/Loader/Loader';
import { Button } from '../../common/Button';
import { User } from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingInProgress, getIsFetching, getTotalUsers, getUsersOnPage, obtainUsers, getCurrentPage } from '../../../redux/selectors/users-selectors';
import { followUsersThunkCreator, getUsersThunkCreator, loadMoreUsersThunkCreator, toggleFollowingProgressAC } from '../../../redux/reducers/usersReducer';
import { Pagination } from '../../common/pagination/Pagination';
import { useAppDispatch } from '../../../redux/app/hooks';
import { AppDispatch } from '../../../redux/redux-store';


export const Users = () => {
	
	//все ранее приходящие из контейнерной комп. пропсы переписываем на useSelector()
	const users = useSelector(obtainUsers)
	const totalUsers = useSelector(getTotalUsers)
	const usersOnPage = useSelector(getUsersOnPage)
	const currentPage = useSelector(getCurrentPage)
	const isFetching = useSelector(getIsFetching)
	const followingInProgress = useSelector(getFollowingInProgress) //пока не получилось реализовать:
	
	//useState
	const [activePage, setActivePage] = useState(1)

	//исп-ем useDispatch() c определенным в сторе типом appdispatch либо второй вариант с промежуточной ф-цией чтобы не испортировать тип каждый раз 
	const dispatch = useDispatch<AppDispatch>()
	// const dispatch = useAppDispatch()

	//mapDispatchToProps из классовой переписываем на ф-ции и
	//напрямую диспатчим из них thunk

	const onLoadButtonClick = () => {
		dispatch(loadMoreUsersThunkCreator(currentPage, usersOnPage));
	}

	const toggleFollowUsers = async (userId: number) => {
 		dispatch(followUsersThunkCreator(userId));
	}


	// const toggleFollowUsers = async (userId: number) => {
	// 	try {
	// 		setFollowingInProgress([...followingInProgress, userId]);
	// 		await dispatch(followUsersThunkCreator(userId));
	// 	} catch (error) {
	// 		// Обработка ошибки при выполнении followUsersThunkCreator
	// 		console.error('Error during follow/unfollow:', error);
	// 		// Здесь можно добавить логику обработки ошибки, например, откат состояния загрузки
	// 	} finally {
	// 		// Сброс состояния загрузки после завершения операции
	// 		setFollowingInProgress(followingInProgress.filter(u => u !== userId));
	// 	}
	// };

	//пока не получилось реализовать
	const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
		dispatch(toggleFollowingProgressAC(isFetching, userId))
	}

	//ф-ция для пагинатора
	const changeCurrentPage = (currentPage: number) => {
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