import { useEffect } from 'react';
import  Navbar from './components/Navbar/Navbar';
import { ProfilePageContainer } from './components/ProfilePage/ProfilePageContainer';
import { Route, Routes } from "react-router-dom";
import { DialogsContainer } from './components/DialogsPage/DialogsContainer';
import { UsersPage } from './components/UsersPage/UsersPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { GalleryContainer } from './components/GalleryPage/GalleryContainer';
import {  useDispatch, useSelector } from 'react-redux';
import { initializeAppThunkCreator } from './redux/reducers/authReducer';
import { Loader } from './components/common/Loader/Loader';
import { Header } from './components/Header/Header';
import styled from 'styled-components';


function App() {

	const dispatch = useDispatch();
	const initialized = useSelector(state => state.auth.initialized);
	const isAuth = useSelector(state => state.auth.isAuth);

	useEffect(() => {
		dispatch(initializeAppThunkCreator());
	}, [dispatch]);

	if (!initialized) {
		return <Loader />;
	}
	return (
		<Wrapper>

			{isAuth && <Navbar />}
			<Header />
			<Routes>
				<Route path="/" element={<ProfilePageContainer />} />
				<Route path='/profile/:userId?' element={<ProfilePageContainer />} />
				<Route path='/dialogs/*' element={<DialogsContainer />} />
				<Route path='/gallery' element={<GalleryContainer />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</Wrapper>
	)
}

export default App;


const Wrapper = styled.div`

`