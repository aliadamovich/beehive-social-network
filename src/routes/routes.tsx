import { createHashRouter, Navigate, Outlet, RouteObject } from "react-router-dom";
import { DialogsPage } from "../features/DialogsPage/ui/DialogsPage";
import { Error404 } from "../common/components/Error404";
import App from "../app/App";
import { Dialogs } from "../features/DialogsPage/ui/dialogs/Dialogs";
import { EmptyDialogs } from "../features/DialogsPage/ui/dialogs/EmptyDialogs";
import { ProfilePage } from "../features/ProfilePage/ui/ProfilePage";
import { useSelector } from "react-redux";
import { ChatPage } from "features/ChatPage/ChatPage";
import { UsersPage } from "features/UserPage/ui/UsersPage";
import { selectIsAuth } from "features/LoginPage/model/authSlice";
import { LoginPage } from "features/LoginPage/ui/LoginPage";
import { Gallery } from "features/GalleryPage/ui/Gallery";
import { useAuth } from "app/hooks/AuthProvider";


export const PATH = {
	ROOT: '/',
	PROFILE: '/profile',
	DIALOGS: '/dialogs',
	DIALOG: '/dialogs/:id',
	USERS: '/users',
	GALLERY: '/gallery',
	CHAT: '/chat',
	LOGIN: '/login',
	ERROR: '/404'
} as const;

export const InitialRedirect = () => {
	const { userId } = useAuth()

	if (userId) {
		return <Navigate to={PATH.PROFILE} />
	} else {
		return <Navigate to={PATH.LOGIN} />
	}
}

//* массив с публичными компонентами
const publicRoutes: RouteObject[] = [
	{
		index: true, // Это путь по умолчанию
		// element: <Navigate to={PATH.PROFILE} />
		element: <InitialRedirect />
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
	{
		path: PATH.GALLERY,
		element: <Gallery />,
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
				element: <EmptyDialogs text={"Choose you dialog..."} />,
				errorElement: <Navigate to={PATH.ERROR} />
			},
			{
				path: ':id',
				element: <Dialogs />
			}
		]
	},
	{
		path: PATH.CHAT,
		element: <ChatPage />,
	},
]

//* создаем hoc для оборачивания всех приватных компонент
export const PrivateRoute = () => {
	const isAuth = useSelector(selectIsAuth)

	return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}


//* создаем объект route
export const router = createHashRouter([
	{
		path: PATH.ROOT,
		element: <App />,
		errorElement: <Navigate to={PATH.ERROR} />,

		children: [
			...publicRoutes,
			{
				element: <PrivateRoute />,
				children: privateRoutes 
			},
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