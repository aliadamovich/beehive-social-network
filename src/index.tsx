import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { HashRouter, RouterProvider} from "react-router-dom";
import { GlobalStyles } from './styles/Global.styled';
import { router } from './routes/routes';
import { store } from './redux/store';



const rootElement = document.getElementById('root');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<Provider store={store}>
		<GlobalStyles />
			{/* <HashRouter>
				<App />
			</HashRouter> */}

			<RouterProvider router={router} />

		</Provider>
	);
} else {
	console.error('Element with id "root" not found.');
}


reportWebVitals();