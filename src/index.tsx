import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './redux/redux-store'
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { HashRouter} from "react-router-dom";
import { GlobalStyles } from './styles/Global.styled';



const rootElement = document.getElementById('root');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<Provider store={store}>
		<GlobalStyles />
			<HashRouter>
				<App />
			</HashRouter>

			{/* <RouterProvider router={router} /> */}
			{/* <AppTest /> */}

		</Provider>
	);
} else {
	console.error('Element with id "root" not found.');
}


reportWebVitals();