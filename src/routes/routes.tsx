import { createBrowserRouter } from "react-router-dom";
import AppTest from "../AppTest";
import { Header } from "../components/layout/Header/Header";
import { DialogsPage } from "../components/layout/DialogsPage/DialogsPage";
import { Error404 } from "../components/common/Error404";
import { ProfilePageContainer } from "../components/ProfilePage/ProfilePageContainer";
// import { PATH } from "./PATHS";


//прописываем пути (косая черта не нужна)
export const PATH = {
	ROOT: 'social_network',
	DIALOGS: 'dialogs',
	USERS: 'users'
} as const;


//создаем роутер который принимает объекты с иерархией
//чилдрен продолжает путь (косая черта ставится автоматом)
export const router = createBrowserRouter([
	{
		path: PATH.ROOT,
		element: <AppTest />,
		errorElement: <Error404/>,
		children: [
			{
				path: 'profile',
				element: <ProfilePageContainer />
			},
			{
				path: 'dialogs',
				element: <DialogsPage />,
				// children: [
				// 	{
				// 		path: '',
				// 		element: <div>Диaллог не выбран</div>
				// 	},
				// 	{
				// 		path: 'currentDialog',
				// 		element: <div>ZZZ</div>
				// 	}
				// ]
			},
		]
	}
])