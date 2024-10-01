import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { initializeAppThunkCreator } from './redux/reducers/authReducer';
import { Loader } from './components/common/Loader/Loader';
import { AppDispatch, AppStateType } from './redux/redux-store';
import { Layout, theme } from 'antd';
import { SiderBlock } from './components/layout/Navbar/Sider';
import { HeaderBlock } from './components/layout/Header/HeaderBlock';

function App() {

	const dispatch = useDispatch<AppDispatch>()
	const initialized = useSelector<AppStateType>(state => state.auth.initialized);
	const isAuth = useSelector<AppStateType>(state => state.auth.isAuth);
	const [collapsed, setCollapsed] = useState(false);

	const { Content, Footer } = Layout;
	const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();

	useEffect(() => {
		dispatch(initializeAppThunkCreator());
	}, [dispatch]);

	if (!initialized) {
		return <Loader />;
	}

	return (

		<Layout>
			{isAuth ?
				<>
					<SiderBlock collapsed={collapsed} />
					<Layout>
					<HeaderBlock collapsed={collapsed} setCollapsed={setCollapsed} />
					<Content style={{ margin: '24px 16px', minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG}} >
						<Outlet />
					</Content>
					<Footer style={{ textAlign: 'center', padding: '0px 24px 5px' }}>
						Beehive ©{new Date().getFullYear()} Created by Alesya Adamovich
					</Footer> 
					</Layout>
				</>
				: 
				<Layout>
					<Content>
						<Outlet />
					</Content>
				</Layout>
			}
			</Layout>

	);
};


//*моя рабочая версия дo AntDesign
// function App() {

// 	const dispatch = useDispatch<AppDispatch>()
// 	const initialized = useSelector<AppStateType>(state => state.auth.initialized);
// 	const isAuth = useSelector<AppStateType>(state => state.auth.isAuth);

// 	useEffect(() => {
// 		dispatch(initializeAppThunkCreator());
// 	}, [dispatch]);

// 	if (!initialized) {
// 		return <Loader />;
// 	}
// 	return (
// 		<>
// 			{isAuth && <Navbar />}
// 			<Header />
// 			<Outlet />
// 			<ErrorBanner />
// 			{/* <Routes>
// 				<Route path="/" element={<Navigate to='/profile' />} />
// 				<Route path='/profile/:userId?' element={<ProfilePageContainer />} />
// 				<Route path='/dialogs' element={<DialogsPage />}>
// 					<Route index element={<EmptyDialogs />} />
// 					<Route path=":id" element={<Dialogs />} />
// 				</Route>
// 				<Route path='/users' element={<UsersPage />} />
// 				<Route path='/gallery' element={<Gallery />} />
// 				<Route path='/chat' element={<ChatPage />} />
// 				<Route path="/login" element={<LoginPage />} />

// 				<Route path={'/error404'} element={<Error404 />} />
// 				<Route path="/*" element={<Navigate to='/error404' />} />
// 			</Routes> */}
// 		</>
// 	)
// }

//*версия до рутингов
// function App() {

// 	const dispatch = useDispatch<AppDispatch>()
// 	const initialized = useSelector<AppStateType>(state => state.auth.initialized);
// 	const isAuth = useSelector<AppStateType>(state => state.auth.isAuth);

// 	useEffect(() => {
// 		dispatch(initializeAppThunkCreator());
// 	}, [dispatch]);

// 	if (!initialized) {
// 		return <Loader />;
// 	}
// 	return (
// 		<>
// 			{isAuth && <Navbar />}
// 			<Header />
// 			<Routes>
// 				<Route path="/" element={<Navigate to='/profile' />} />
// 				<Route path='/profile/:userId?' element={<ProfilePageContainer />} />
// 				<Route path='/dialogs' element={<DialogsPage />}>
// 					<Route index element={<EmptyDialogs />} />
// 					<Route path=":id" element={<Dialogs />} />
// 				</Route>
// 				<Route path='/users' element={<UsersPage />} />
// 				<Route path='/gallery' element={<Gallery />} />
// 				<Route path='/chat' element={<ChatPage />} />
// 				<Route path="/login" element={<LoginPage />} />

// 				<Route path={'/error404'} element={<Error404 />} />
// 				<Route path="/*" element={<Navigate to='/error404' />} />
// 			</Routes>
// 		</>
// 	)
// }

export default App;


