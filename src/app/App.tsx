import { Suspense, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../common/components/Loader/Loader';
import { ConfigProvider, Layout, theme } from 'antd';
import { HeaderBlock } from '../features/header/ui/HeaderBlock';
import { myTheme } from "../styles/Theme";
import { ErrorBanner } from '../common/components/ErrorBanner';
import { SiderBar } from 'features/sideBar/SideBar';
import { selectIsAuth, setIsAuth } from 'features/LoginPage/model/authSlice';
import { AppDispatch, AppStateType } from 'app/store';
import { useMeQuery } from 'features/LoginPage/api/authApi';
import { ResultCodes } from 'common/enums/enum';
import { PATH } from 'routes/routes';
import { useAuth } from 'app/hooks/useAuth';


function App() {
	// const dispatch = useDispatch<AppDispatch>()
	// const appStatus = useSelector<AppStateType>(state => state.app.status);
	const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
	const { Content, Footer } = Layout;
	const [collapsed, setCollapsed] = useState(true);
	// const [isAppInitialized, setIsAppInitialized] = useState(false)
	
	// const {data, isLoading} = useMeQuery()
	// const rData = data?.data
	// useEffect(() => {

	// 	if (!isLoading ) {
	// 		setIsAppInitialized(true)
	// 		if (data?.resultCode === ResultCodes.Success && rData && 'id' in rData) {
	// 			dispatch(setIsAuth({ isAuth: true, userId: rData?.id }))
	// 		}
	// 	}
	// },
	// 	[data]);
	
	const isAuth = useSelector(selectIsAuth)
	const { isAppInitialized } = useAuth()
	const location = useLocation()
	
	if (!isAppInitialized) {
		return <Loader />;
	}
	
	if (!isAuth && location.pathname === PATH.PROFILE) {
		return <Navigate to={PATH.LOGIN} />
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
				{/* <div >{appStatus === "loading" && <Loader />}</div> */}
			</Layout>
			
		</ConfigProvider>
		
	);
};




export default App;


