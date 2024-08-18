import { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from './components/layout/UsersPage/UsersPage';
import {  useDispatch, useSelector } from 'react-redux';
import { initializeAppThunkCreator } from './redux/reducers/authReducer';
import { Loader } from './components/common/Loader/Loader';
import { Header } from './components/layout/Header/Header';
import styled from 'styled-components';
import { DialogsPage } from './components/layout/DialogsPage/DialogsPage';
import { Error404 } from './components/common/Error404';
import { AppDispatch, AppStateType } from './redux/redux-store';
import { EmptyDialogs } from './components/layout/DialogsPage/dialogs/EmptyDialogs';
import { Dialogs } from './components/layout/DialogsPage/dialogs/Dialogs';
import Navbar from './components/layout/Navbar/Navbar';
import { ProfilePageContainer } from './components/layout/ProfilePage/ProfilePageContainer';
import { GalleryContainer } from './components/layout/GalleryPage/GalleryContainer';
import { ChatPage } from './components/layout/ChatPage/ChatPage';
import { LoginPage } from './components/layout/LoginPage/LoginPage';


function App() {

	const dispatch = useDispatch<AppDispatch>()
	const initialized = useSelector<AppStateType>(state => state.auth.initialized);
	const isAuth = useSelector<AppStateType>(state => state.auth.isAuth);

	useEffect(() => {
		dispatch(initializeAppThunkCreator());
	}, [dispatch]);

	if (!initialized) {
		return <Loader />;
	}
	return (
		<>
			{isAuth && <Navbar />}
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to='/profile' />} />
				<Route path='/profile/:userId?' element={<ProfilePageContainer />} />
				<Route path='/dialogs' element={<DialogsPage />}>
					<Route index element={<EmptyDialogs />} />
					<Route path=":id" element={<Dialogs />} />
				</Route>
				<Route path='/users' element={<UsersPage />} />
				<Route path='/gallery' element={<GalleryContainer />} />
				<Route path='/chat' element={<ChatPage />} />
				<Route path="/login" element={<LoginPage />} />

				<Route path={'/error404'} element={<Error404 />} />
				<Route path="/*" element={<Navigate to='/error404' />} />
			</Routes>
		</>
	)
}

export default App;


