import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../common/components/Loader/Loader';
import { ConfigProvider, Layout, theme } from 'antd';
import { HeaderBlock } from '../features/header/ui/HeaderBlock';
import { myTheme } from "../styles/Theme";
import { ErrorBanner } from '../common/components/ErrorBanner';
import { SiderBar } from 'features/sideBar/SideBar';
import { getMeTC, selectIsInitialized, setIsAuth } from 'features/LoginPage/model/authSlice';
import { AppDispatch, AppStateType } from 'app/store';
import { useMeQuery } from 'features/LoginPage/api/authApi';
import { ResultCodes } from 'common/enums/enum';


function App() {
	const dispatch = useDispatch<AppDispatch>()
	// const isInitialized = useSelector<AppStateType>(state => state.auth.initialized);
	// const isInitialized = useSelector(selectIsInitialized);
	const appStatus = useSelector<AppStateType>(state => state.app.status);
	const [collapsed, setCollapsed] = useState(true);
	const [isAppInitialized, setIsAppInitialized] = useState(false)
	const { Content, Footer } = Layout;
	const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
	
	const {data, isLoading} = useMeQuery()
	// console.log(data);
	useEffect(() => {
		// dispatch(getMeTC()) 
		if (!isLoading) {
			setIsAppInitialized(true)
			if (data?.resultCode === ResultCodes.Success) {
				dispatch(setIsAuth({isAuth: true, userId: data?.data.id}))
			}
		}
	},
		[data]);

	if (!isAppInitialized) {
		return <Loader />;
	}

	return (

		<ConfigProvider
			theme={{
				token: {
					fontFamily: `${myTheme.fonts.main}`,
					colorText: `${myTheme.colors.mainFontColor}`
				},
			}}>

			<Layout hasSider style={{ minHeight: '100%' }} >
				<SiderBar collapsed={collapsed} setCollapsed={setCollapsed}/>
				<Layout style={{ marginInlineStart: collapsed ? 80 : 200, transition: 'all 0.2s ease' }}>
					<HeaderBlock collapsed={collapsed} setCollapsed={setCollapsed} />
					<Content style={{ margin: '24px 16px', overflow: 'initial', background: colorBgContainer, borderRadius: borderRadiusLG }} >
						<Outlet />
					</Content>
					<Footer style={{ textAlign: 'center', padding: '0px 24px', height: '35px' }}>
						Beehive ©{new Date().getFullYear()} Created by Alesya Adamovich
					</Footer>
				</Layout>
				{/* <Layout>
						<Content>
							<Outlet />
						</Content>
					</Layout> */}
				<ErrorBanner />
				<div >{appStatus === "loading" && <Loader />}</div>
			</Layout>
			
		</ConfigProvider>


//компонент до рефаторинга
	// 	 <ConfigProvider
	// 		theme={{
	// 			token: {
	// 					fontFamily: `${myTheme.fonts.main}`,
	// 					colorText: `${myTheme.colors.mainFontColor}`
	// 			},
	// 	}}
	// >
	// 		<Layout hasSider
	// 		style={{minHeight: '100%'}}
	// 		>
	// 			{isAuth ?
	// 				<>
	// 					<SiderBar collapsed={collapsed} />
	// 					<Layout style={{ marginInlineStart: collapsed ? 80 : 200, transition: 'all 0.2s ease' }}>
	// 						<HeaderBlock collapsed={collapsed} setCollapsed={setCollapsed} />
	// 						<Content style={{ margin: '24px 16px', overflow: 'initial', background: colorBgContainer, borderRadius: borderRadiusLG }} >
	// 							<Outlet />
	// 						</Content>
	// 						<Footer style={{ textAlign: 'center', padding: '0px 24px', height: '22px' }}>
	// 							Beehive ©{new Date().getFullYear()} Created by Alesya Adamovich
	// 						</Footer>
	// 					</Layout>
	// 				</>
	// 				:
	// 				<Layout>
	// 					<Content>
	// 						<Outlet />
	// 					</Content>
	// 				</Layout>
	// 			}
	// 			<ErrorBanner />
	// 		</Layout>
  //       </ConfigProvider>
		
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


