import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { HashRouter, RouterProvider} from "react-router-dom";
import { GlobalStyles } from './styles/Global.styled';
import { router } from './routes/routes';
import { store } from './app/store';
import { AuthProvider } from 'app/hooks/AuthProvider';



const rootElement = document.getElementById('root');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<Provider store={store}>
			<GlobalStyles />
		{/* <AuthProvider> */}
				<RouterProvider router={router} />
		{/* </AuthProvider> */}
		</Provider>
	);
} else {
	console.error('Element with id "root" not found.');
}


reportWebVitals();