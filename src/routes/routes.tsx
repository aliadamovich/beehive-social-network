import { createBrowserRouter, createHashRouter, Navigate, Outlet, RouteObject } from "react-router-dom";
import { DialogsPage } from "../components/layout/DialogsPage/DialogsPage";
import { Error404 } from "../components/common/Error404";
import App from "../App";
import { UsersPage } from "../components/layout/UsersPage/UsersPage";
import { Gallery } from "../components/layout/GalleryPage/Gallery";
import { ChatPage } from "../components/layout/ChatPage/ChatPage";
import { Dialogs } from "../components/layout/DialogsPage/dialogs/Dialogs";
import { EmptyDialogs } from "../components/layout/DialogsPage/dialogs/EmptyDialogs";
import { LoginPage } from "../components/layout/LoginPage/LoginPage";
import { ProfilePage } from "../components/layout/ProfilePage/ProfilePage";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/redux-store";


export const PATH = {
	ROOT: '/',
	PROFILE: '/profile',
	DIALOGS: '/dialogs',
	DIALOG: '/dialogs/:id',
	USERS: '/users',
	GALLERY: '/gallery',
	CHAT: '/chat',
	LOGIN: '/login',
	ERROR: '/error404'
} as const;

//* массив с публичными компонентами
const publicRoutes: RouteObject[] = [
	{
		index: true, // Это путь по умолчанию
		element: <Navigate to={PATH.PROFILE} />
	},
	{
		path: PATH.PROFILE,
		element: <ProfilePage />,
		children: [
			{
				path: ':userId',
				element: <ProfilePage />
			}
		]
	},
	{
		path: PATH.USERS,
		element: <UsersPage />,
	},
]

//* массив с приватными компонентами
const privateRoutes: RouteObject[] = [
	{
		path: PATH.DIALOGS,
		element: <DialogsPage />,
		children: [
			{
				index: true,
				element: <EmptyDialogs text={"Choose you dialog..."} />
			},
			{
				path: ':id',
				element: <Dialogs />
			}
		]
	},
	{
		path: PATH.GALLERY,
		element: <Gallery />,
	},
	{
		path: PATH.CHAT,
		element: <ChatPage />,
	},
]

//* создаем hoc для оборачивания всех приватных компонент
export const PrivateRoute = () => {
	const isAuth = useSelector<AppStateType>(state => state.auth.isAuth);

	return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}


//* создаем объект route
export const router = createHashRouter([
	{
		path: PATH.ROOT,
		element: <App />,
		errorElement: <Navigate to={PATH.ERROR} />,

		children: [
			{
				element: <PrivateRoute />,
				children: privateRoutes 
			},
			...publicRoutes
		],
	},
	{
		path: PATH.LOGIN,
		element: <LoginPage />,
	},
	{
		path: PATH.ERROR,
		element: <Error404 />,
	},
])




//так было до рефакторинга с приватными рутами
// export const router = createHashRouter([
// 	{
// 		path: PATH.ROOT,
// 		element: <App />,
// 		errorElement: <Navigate to={PATH.ERROR} />,

// 		children: [
// 			{
// 				index: true, // Это путь по умолчанию
// 				element: <Navigate to={PATH.PROFILE} />
// 			},
// 			{
// 				path: PATH.PROFILE,
// 				element: <ProfilePage />,
// 				children: [
// 					{
// 						path: ':userId',
// 						element: <ProfilePage />
// 					}
// 				]
// 			},
// 			{
// 				path: PATH.DIALOGS,
// 				element: <DialogsPage />,
// 				children: [
// 					{
// 						index: true,
// 						element: <EmptyDialogs text={"Choose you dialog..."} />
// 					},
// 					{
// 						path: ':id',
// 						element: <Dialogs />
// 					}
// 				]
// 			},
// 			{
// 				path: PATH.USERS,
// 				element: <UsersPage />,
// 			},
// 			{
// 				path: PATH.GALLERY,
// 				element: <Gallery />,
// 			},
// 			{
// 				path: PATH.CHAT,
// 				element: <ChatPage />,
// 			},
// 			{
// 				path: PATH.LOGIN,
// 				element: <LoginPage />,
// 			},
// 			{
// 				path: PATH.ERROR,
// 				element: <Error404 />,
// 			},
// 		]
// 	}
// ])